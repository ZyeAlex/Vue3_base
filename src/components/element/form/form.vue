<script setup lang="ts">
import { ref, provide } from 'vue'
// 属性
const props = withDefaults(
    defineProps<{
        model: any
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

// 表单事件
defineExpose({
    validate: (...args: any[]) => form.value.validate(...args)
})

// 注入数据
provide('model', props.model)
provide('col', props.col)
provide('inline', props.inline)
provide('padding', props.padding)
</script>

<template>
    <el-form ref="form" inline :model="model">

        <slot></slot>

    </el-form>
</template>

<style lang="scss" ></style>