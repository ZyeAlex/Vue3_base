<script setup lang="ts">
withDefaults(defineProps<{
    prop: string
    label?: string
    labelWidth?: string | number
    type?: string
    placeholder?: string
    option?: any[]
    required?: boolean
    error?: string
    showMessage?: boolean
    inlineMessage?: string | boolean
    size?: 'large' | 'default' | 'small'
    validateStatus?: 'error' | 'validating' | 'success'
}>(), {
    type: 'text',
    placeholder: '请输入',
    required: false,
    rules: {},
    option: () => [],
})
import { inject } from 'vue'
const model = inject('model')
</script>

<template>
    <el-form-item v-if="type == 'text'" v-bind="$props">
        <el-input v-model="model[prop]" type="text" :placeholder="placeholder" v-bind="$attrs" />
    </el-form-item>
    <el-form-item v-if="type == 'number'" v-bind="$props">
        <el-input v-model.number="model[prop]" type="number" :placeholder="placeholder" v-bind="$attrs" />
    </el-form-item>
    <el-form-item v-if="type == 'textarea'" v-bind="$props">
        <el-input v-model="model[prop]" type="textarea" :placeholder="placeholder" v-bind="$attrs" />
    </el-form-item>
    <el-form-item v-if="type == 'select'" v-bind="$props">
        <el-select v-model="model[prop]" style="width: 100%;" v-bind="$attrs">
            <el-option v-if="option && option.length" v-for="item in option" :key="item.value" :label="item.label"
                :value="item.value">
            </el-option>
            <slot></slot>
        </el-select>
    </el-form-item>
</template>

<style lang="scss" scoped></style>