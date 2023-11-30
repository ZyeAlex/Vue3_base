<script setup lang="ts">



const props =
    withDefaults(defineProps<{
        prop: string
        label?: string
        type?: string

        // 字典展示
        option?: any[]
        optionLabel?: string
        optionValue?: string




        // 原生form
        placeholder?: string
        required?: boolean
        showMessage?: boolean
        inlineMessage?: string | boolean
        size?: 'large' | 'default' | 'small'
        validateStatus?: 'error' | 'validating' | 'success'
        labelWidth?: string | number
        col?: number | string
        width?: string
        style?: object
        padding?: string
        rules?: object
    }>(), {
        type: 'text',
        placeholder: '请输入',
        required: undefined,
        rules: undefined,
        showMessage: true,
        labelWidth: undefined,

        option: () => [],
        optionLabel: 'label',
        optionValue: 'value',

        inlineMessage: '',
        col: 1
    })
import { inject, computed } from 'vue'

const col = inject<number>('col')
const inline = inject('inline')
const padding = inject('padding')
const width = computed(() => {
    if (props.width) {
        return props.width
    }
    if (inline) {
        return ''
    }
    const _col = props.col || col
    if (_col) {
        return Math.floor(100 * Number(_col) / col) + '%'
    }
})
const style = computed(() => {
    return Object.assign({}, props.style, { width: width.value, paddingRight: props.padding || padding })
})


// 用来处理  model 为  model:{list:[{xxx},{xxx}]}  prop 为  list.0.xxx 的情况
const model = inject('model')
const keys = Array.isArray(props.prop) ? props.prop : props.prop?.split('.')
const getModel = computed(() => {
    let nextModel = model
    for (let i = 0; i < keys.length - 1; i++) {
        nextModel = nextModel[keys[i]]
    }
    return nextModel
})
const getKey = computed(() => {
    return keys[keys.length - 1]
})

</script>

<template>
    <el-form-item v-bind="$props" :style="style" v-if="type == 'text'">
        <!-- 输入框 -->
        <el-input v-model="getModel[getKey]" type="text" :placeholder="placeholder" v-bind="$attrs" />
    </el-form-item>
    <el-form-item v-bind="$props" v-else-if="type == 'number'" :style="style">
        <!-- 数字框 -->
        <el-input v-model.number="getModel[getKey]" type="number" :placeholder="placeholder" v-bind="$attrs" />
    </el-form-item>
    <el-form-item v-bind="$props" v-else-if="type == 'textarea'" :style="style">
        <!-- 富文本 -->
        <el-input v-model="getModel[getKey]" type="textarea" :placeholder="placeholder" v-bind="$attrs" />
    </el-form-item>
    <el-form-item v-bind="$props" v-else-if="type == 'select'" :style="style">
        <!-- 下拉选择框 -->
        <el-select v-model="getModel[getKey]" style="width: 100%;" v-bind="$attrs" clearable>
            <el-option v-if="option && option.length" v-for="item in option" :key="item[optionValue]"
                :label="item[optionLabel]" :value="item[optionValue]">
            </el-option>
            <slot></slot>
        </el-select>
    </el-form-item>
    <el-form-item v-bind="$props" v-else-if="type == 'selects'" :style="style">
        <!-- 选择器——单选 -->
        <el-select v-model="getModel[getKey]" style="width: 100%;" v-bind="$attrs" multiple clearable>
            <el-option v-if="option && option.length" v-for="item in option" :key="item[optionValue]"
                :label="item[optionLabel]" :value="item[optionValue]">
            </el-option>
            <slot></slot>
        </el-select>
    </el-form-item>
    <el-form-item v-bind="$props" v-else-if="type == 'checkbox'" :style="style">
        <!-- 选择器——多选 -->
        <el-checkbox-group v-model="getModel[getKey]" v-bind="$attrs">
            <el-checkbox v-for="item in option" :key="item[optionValue]" :label="item[optionLabel]"
                :name="item[optionValue]" />
        </el-checkbox-group>
    </el-form-item>
    <el-form-item v-bind="$props" v-else-if="type == 'switch'" :style="style">
        <!-- 开关 -->
        <el-switch v-model="getModel[getKey]" v-bind="$attrs" />
    </el-form-item>
    <el-form-item v-bind="$props" v-else-if="type == 'radio'" :style="style">
        <!-- 单选框 -->
        <el-radio-group v-model="getModel[getKey]" v-bind="$attrs">
            <el-radio v-for="item in option" :key="item[optionValue]" :label="item[optionLabel]" />
        </el-radio-group>
    </el-form-item>
    <el-form-item v-bind="$props" v-else-if="type == 'default'" :style="style">
        <!-- 原生 -->
        <slot></slot>
    </el-form-item>
</template>

<style lang="scss" scoped>
.el-form--inline .el-form-item {
    margin-right: 0;
    padding: 1px;
}
</style>