<script setup lang="ts">
import { ref, provide } from 'vue'
// 属性
const props = withDefaults(
    defineProps<{
        modelValue: any
        col?: number
    }>(),
    {
        col: 2
    }
)
const form = ref()

// 表格事件
defineExpose({
    validate: (...args: any[]) => form.value.validate(...args)
})

// 注入数据
provide('model', props.modelValue)
provide('cols', props.col)

</script>

<template>
    <el-form ref="form" :model="modelValue">
        <el-row>
            <slot></slot>
        </el-row>
    </el-form>
</template>

<style lang="scss" scoped></style>