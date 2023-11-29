<script setup lang="ts">

const props =
    withDefaults(defineProps<{
        prop: string
        label?: string
        labelWidth?: string | number
        type?: string
        placeholder?: string
        option?: any[]
        optionLabel?: string
        optionValue?: string
        required?: boolean
        showMessage?: boolean
        inlineMessage?: string | boolean
        size?: 'large' | 'default' | 'small'
        validateStatus?: 'error' | 'validating' | 'success'
        col?: number | string
        width?: string
        style?: object
        padding?: string
    }>(), {
        type: 'text',
        placeholder: '请输入',
        required: false,
        rules: {},
        showMessage: true,
        labelWidth: '',
        option: () => [],
        optionLabel: 'label',
        optionValue: 'value',
        inlineMessage: '',
        col: 1
    })
import { inject, computed } from 'vue'
const fatherProps = inject<any>('props')
const width = computed(() => {
    if (props.width) {
        return props.width
    }
    if (fatherProps.inline) {
        return ''
    }
    const _col = props.col || fatherProps.col
    if (_col) {
        return Math.floor(100 * _col / fatherProps.col) + '%'
    }
})
const style = computed(() => {
    return Object.assign({}, props.style, { width: width.value, paddingRight: props.padding || fatherProps.padding })
})
</script>

<template>
    <el-form-item v-bind="$props" v-if="type == 'text'" :style="style">
        <el-input v-model="fatherProps.modelValue[prop]" type="text" :placeholder="placeholder" v-bind="$attrs" />
    </el-form-item>
    <el-form-item v-bind="$props" v-if="type == 'number'" :style="style">
        <el-input v-model.number="fatherProps.modelValue[prop]" type="number" :placeholder="placeholder" v-bind="$attrs" />
    </el-form-item>
    <el-form-item v-bind="$props" v-if="type == 'textarea'" :style="style">
        <el-input v-model="fatherProps.modelValue[prop]" type="textarea" :placeholder="placeholder" v-bind="$attrs" />
    </el-form-item>
    <el-form-item v-bind="$props" v-if="type == 'select'" :style="style">
        <el-select v-model="fatherProps.modelValue[prop]" style="width: 100%;" v-bind="$attrs" clearable>
            <el-option v-if="option && option.length" v-for="item in option" :key="item[optionValue]"
                :label="item[optionLabel]" :value="item[optionValue]">
            </el-option>
            <slot></slot>
        </el-select>
    </el-form-item>
    <el-form-item v-bind="$props" v-if="type == 'selects'" :style="style">
        <el-select v-model="fatherProps.modelValue[prop]" style="width: 100%;" v-bind="$attrs" multiple clearable
            collapse-tags>
            <el-option v-if="option && option.length" v-for="item in option" :key="item[optionValue]"
                :label="item[optionLabel]" :value="item[optionValue]">
            </el-option>
            <slot></slot>
        </el-select>
    </el-form-item>
    <el-form-item v-bind="$props" v-if="type == 'switch'" :style="style">
        <el-switch v-model="fatherProps.modelValue[prop]" v-bind="$attrs" :name="fatherProps.modelValue[prop]" />
    </el-form-item>
    <el-form-item v-bind="$props" v-if="type == 'checkbox'" :style="style">
        <el-checkbox-group v-model="fatherProps.modelValue[prop]" v-bind="$attrs">
            <el-checkbox v-for="item in option" :key="item[optionValue]" :label="item[optionLabel]"
                :name="item[optionValue]" />
        </el-checkbox-group>
    </el-form-item>
    <el-form-item v-bind="$props" v-if="type == 'radio'" :style="style">
        <el-radio-group v-model="fatherProps.modelValue[prop]" v-bind="$attrs">
            <el-radio v-for="item in option" :key="item[optionValue]" :label="item[optionLabel]" />
        </el-radio-group>
    </el-form-item>
    <!-- 原生 -->
    <el-form-item v-bind="$props" v-if="type == 'default'" :style="style">
        <slot></slot>
    </el-form-item>
</template>

<style lang="scss" scoped>
.el-form--inline .el-form-item {
    margin-right: 0;
    padding: 1px;
}
</style>