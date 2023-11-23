<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        prop: string
    }>()
    , {}
)
import { inject } from 'vue'
const model = inject('model')
</script>

<template>
    <el-form-item>
        <el-input v-model="model[prop]" />
    </el-form-item>
</template>

<style lang="scss" scoped></style>