<script setup lang="ts">
import { ref, provide } from 'vue'
// 属性
const props = withDefaults(
    defineProps<{
        modelValue: any
        col?: number | string
        inline?: boolean
        padding?: string
    }>(),
    {
        col: 1,
        inline: false,
        padding: '10px'
    }
)
const form = ref()

// 表格事件
defineExpose({
    validate: (...args: any[]) => form.value.validate(...args)
})

// 注入数据
provide('props', props)
</script>

<template>
    <el-form ref="form" :model="modelValue" inline>

        <slot></slot>

    </el-form>
</template>

<style lang="scss" ></style>