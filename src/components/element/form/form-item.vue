<script setup lang="ts">

import { inject, computed, onMounted, getCurrentInstance, ref, nextTick } from 'vue'


const props =
    withDefaults(defineProps<{
        prop: string
        label?: string
        type?: string

        // 字典展示
        option?: any[]
        props?: { label: any, value: any }




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
        props: () => ({
            label: 'label',
            value: "value"
        }),

        inlineMessage: '',
        col: 1
    })
let instance = null
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
    <el-form-item v-bind="$props" :style="style">
        <!-- 输入框 -->
        <el-input v-model="getModel[getKey]" type="text" :placeholder="placeholder" v-bind="$attrs" v-if="type == 'text'" />
        <!-- 数字框 -->
        <el-input v-model.number="getModel[getKey]" type="number" :placeholder="placeholder" v-bind="$attrs"
            v-else-if="type == 'number'" />
        <!-- 富文本 -->
        <el-input v-model="getModel[getKey]" type="textarea" :placeholder="placeholder" v-bind="$attrs"
            v-else-if="type == 'textarea'" />
        <!-- 下拉选择框 -->
        <el-select v-model="getModel[getKey]" style="width: 100%;" v-bind="$attrs" clearable v-else-if="type == 'select'"
            :style="style">
            <el-option v-if="option && option.length" v-for="item in option" :key="item[props.props.label]"
                :label="item[props.props.label]" :value="item[props.props.value]">
            </el-option>
            <slot></slot>
        </el-select>
        <!-- 选择器——多选 -->
        <el-select v-model="getModel[getKey]" style="width: 100%;" v-bind="$attrs" multiple clearable
            v-else-if="type == 'selects'">
            <el-option v-if="option && option.length" v-for="item in option" :key="item[props.props.value]"
                :label="item[props.props.label]" :value="item[props.props.value]">
            </el-option>
            <slot></slot>
        </el-select>
        <el-checkbox-group v-model="getModel[getKey]" v-bind="$attrs" v-else-if="type == 'checkbox'">
            <el-checkbox v-for="item in option" :key="item[props.props.value]" :label="item[props.props.label]"
                :name="item[props.props.value]" />
        </el-checkbox-group>
        <!-- 开关 -->
        <el-switch v-model="getModel[getKey]" v-bind="$attrs" v-else-if="type == 'switch'" />
        <!-- 单选框 -->
        <el-radio-group v-model="getModel[getKey]" v-bind="$attrs" v-else-if="type == 'radio'">
            <el-radio v-for="item in option" :key="item[props.props.value]" :label="item[props.props.label]" />
        </el-radio-group>
        <!-- 原生 -->
        <template v-else-if="type == 'default'">
            <slot></slot>
        </template>
    </el-form-item>
</template>

<style lang="scss" scoped>
.el-form--inline .el-form-item {
    margin-right: 0;
    padding: 1px;
}
</style>