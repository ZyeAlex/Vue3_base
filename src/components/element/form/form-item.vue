<script setup lang="ts">
withDefaults(defineProps<{
    prop: string
    type?: string
    placeholder?: string
}>(), {
    type: 'text',
    placeholder: '请输入'
})
import { inject } from 'vue'
const model = inject('model')
</script>

<template>
    <el-form-item v-if="type == 'text'" :prop="prop">
        <el-input v-model="model[prop]" type="text" :placeholder="placeholder" />
    </el-form-item>
    <el-form-item v-if="type == 'number'" :prop="prop">
        <el-input v-model="model[prop]" type="number" :placeholder="placeholder" />
    </el-form-item>
    <el-form-item v-if="type == 'textarea'" :prop="prop">
        <el-input v-model="model[prop]" type="textarea" :placeholder="placeholder" />
    </el-form-item>
</template>

<style lang="scss" scoped></style>