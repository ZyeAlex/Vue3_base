<script setup lang="ts">
import { ref, provide } from 'vue'
// 属性
const props = withDefaults(
    defineProps<{
        model: any
        col?: number | string
        inline?: boolean
        padding?: string
        // 是否为position布局
        position?: boolean
    }>(),
    {
        col: 1,
        inline: false,
        padding: '10px',
        position: false
    }
)
const form = ref()

// 表单事件
defineExpose({
    validate: (...args: any[]) => form.value.validate(...args),
    validateField: (...args: any[]) => form.value.validateField(...args),
    resetFields: (...args: any[]) => form.value.resetFields(...args),
    scrollToField: (...args: any[]) => form.value.scrollToField(...args),
    clearValidate: (...args: any[]) => form.value.clearValidate(...args),
})

// 注入数据
provide('model', props.model)
provide('col', props.col)
provide('inline', props.inline)
provide('padding', props.padding)
</script>

<template>
    <el-form ref="form" inline :model="model" :style="position && { height: '100%' }">

        <slot></slot>

    </el-form>
</template>

<style lang="scss" ></style>