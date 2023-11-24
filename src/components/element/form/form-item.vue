<script setup lang="ts">
withDefaults(defineProps<{
    prop: string
    label?: string
    labelWidth?: string | number
    type?: string
    placeholder?: string
    option?: any[]
    required?: boolean
    // error?: string
    showMessage?: boolean
    inlineMessage?: string | boolean
    size?: 'large' | 'default' | 'small'
    validateStatus?: 'error' | 'validating' | 'success'
    col?: number
}>(), {
    type: 'text',
    placeholder: '请输入',
    required: false,
    rules: {},
    showMessage: true,
    labelWidth: '',
    option: () => [],
    inlineMessage: '',
})
import { inject } from 'vue'
const model = inject('model')
const cols: number = inject('cols')
</script>

<template>
    <!-- 文本输入框 -->
    <el-col :span="col ? (24 / cols) * col : 24 / cols" v-if="type == 'text'" style="padding-right: 10px;">
        <el-form-item v-bind="$props">
            <el-input v-model="model[prop]" type="text" :placeholder="placeholder" v-bind="$attrs" />
        </el-form-item>
    </el-col>

    <!-- 数字输入框 -->
    <el-col :span="col ? (24 / cols) * col : 24 / cols" v-if="type == 'number'" style="padding-right: 10px;">
        <el-form-item v-bind="$props">
            <el-input v-model.number="model[prop]" type="number" :placeholder="placeholder" v-bind="$attrs" />
        </el-form-item>
    </el-col>

    <!-- 富文本输入框 -->
    <el-col :span="col ? (24 / cols) * col : 24 / cols" v-if="type == 'textarea'" style="padding-right: 10px;">
        <el-form-item v-bind="$props">
            <el-input v-model="model[prop]" type="textarea" :placeholder="placeholder" v-bind="$attrs" />
        </el-form-item>
    </el-col>

    <!-- 下拉框 -->
    <el-col :span="col ? (24 / cols) * col : 24 / cols" v-if="type == 'select'" style="padding-right: 10px;">
        <el-form-item v-bind="$props">
            <el-select v-model="model[prop]" style="width: 100%;" v-bind="$attrs">
                <el-option v-if="option && option.length" v-for="item in option" :key="item.value" :label="item.label"
                    :value="item.value">
                </el-option>
                <slot></slot>
            </el-select>
        </el-form-item>
    </el-col>

    <!-- 开关 -->
    <el-col :span="col ? (24 / cols) * col : 24 / cols" v-if="type == 'switch'" style="padding-right: 10px;">
        <el-form-item v-bind="$props">
            <el-switch v-model="model[prop]" v-bind="$attrs" :name="model[prop]" />
        </el-form-item>
    </el-col>

    <!-- 复选框 -->
    <el-col :span="col ? (24 / cols) * col : 24 / cols" v-if="type == 'checkbox'" style="padding-right: 10px;">
        <el-form-item v-bind="$props">
            <el-checkbox-group v-model="model[prop]" v-bind="$attrs">
                <el-checkbox v-for="item in option" :key="item.value" :label="item.label" :name="item.value" />
            </el-checkbox-group>
        </el-form-item>
    </el-col>

    <!-- radio按钮 -->
    <el-col :span="col ? (24 / cols) * col : 24 / cols" v-if="type == 'radio'" style="padding-right: 10px;">
        <el-form-item v-bind="$props">
            <el-radio-group v-model="model[prop]">
                <el-radio v-for="item in option" :key="item.value" :label="item.label" />
            </el-radio-group>
        </el-form-item>
    </el-col>
</template>

<style lang="scss" scoped></style>