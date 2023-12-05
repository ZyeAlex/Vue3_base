<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-11-29
 -->

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import Form from '../form/form.vue'
const form = ref()
const table = ref()
const props = withDefaults(
    defineProps<{
        data: object[]
        rules?: any
    }>(),
    {
        data: () => [],
        rules: () => { }
    }
)
// 用于表单校验
const data = ref({
    list: []
})
watch(() => props.data, () => {
    data.value.list = props.data
}, {
    immediate: true,
    deep: true
})
const getData = () => {
    return data.value.list
}

provide('rules', props.rules)


// 表格事件
defineExpose({
    // 获取数据
    getData,
    // form
    validate: (...args: any[]) => form.value.validate(...args),
    validateField: (...args: any[]) => form.value.validateField(...args),
    resetFields: (...args: any[]) => form.value.resetFields(...args),
    scrollToField: (...args: any[]) => form.value.scrollToField(...args),
    clearValidate: (...args: any[]) => form.value.clearValidate(...args),
    // table
    clearSelection: (...args: any[]) => table.value.clearSelection(...args),
    getSelectionRows: (...args: any[]) => table.value.getSelectionRows(...args),
    toggleRowSelection: (...args: any[]) => table.value.toggleRowSelection(...args),
    toggleAllSelection: (...args: any[]) => table.value.toggleAllSelection(...args),
    toggleRowExpansion: (...args: any[]) => table.value.toggleRowExpansion(...args),
    setCurrentRow: (...args: any[]) => table.value.setCurrentRow(...args),
    clearSort: (...args: any[]) => table.value.clearSort(...args),
    clearFilter: (...args: any[]) => table.value.clearFilter(...args),
    doLayout: (...args: any[]) => table.value.doLayout(...args),
    sort: (...args: any[]) => table.value.sort(...args),
    scrollTo: (...args: any[]) => table.value.scrollTo(...args),
    setScrollTop: (...args: any[]) => table.value.setScrollTop(...args),
    setScrollLeft: (...args: any[]) => table.value.setScrollLeft(...args),
})

</script>

<template>
    <Form ref="form" :model="data" :rules="rules">
        <el-table ref="table" :data="props.data" v-bind="$attrs" inline>
            <slot></slot>
        </el-table>
    </Form>
</template>

<style lang='scss' scoped>
.container {}
</style>