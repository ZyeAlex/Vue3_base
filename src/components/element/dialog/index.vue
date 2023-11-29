<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-11-29
 -->

<script setup lang="ts">
import { ref, useSlots } from 'vue'
const props = withDefaults(defineProps<{
    title?: string
}>(), {
    title: '标题'
})
// dialogRef
const dialogRef = ref()
// dialogShow
const dialogShow = ref(false)
// 打开Dialog
const open = () => {
    dialogShow.value = true
}
// 关闭Dialog
const close = () => {
    dialogShow.value = false
}
defineExpose({
    open,
    close
})


const slots = useSlots()
</script>

<template>
    <el-dialog ref="dialogRef" v-model="dialogShow">
        <!-- 标题 -->
        <template #title>
            <slot name="title">{{ title }}</slot>
        </template>
        <!-- 内容 -->
        <template #default>
            <slot name="default"></slot>
        </template>
        <!-- 尾部 -->
        <template #footer v-if="slots.footer">
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>

<style lang='scss' scoped>
.container {}
</style>