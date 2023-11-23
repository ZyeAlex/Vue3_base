<script setup lang="ts">
import { provide, inject } from 'vue'
const props = defineProps<{
    model: any
}>()
provide('model', props.model)
</script>

<template>
    <el-form :model="model">
        <slot></slot>
    </el-form>
</template>

<style lang="scss" scoped></style>