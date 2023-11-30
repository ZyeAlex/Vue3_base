<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-11-29
 -->

<script setup lang="ts">
import { inject, ref } from 'vue'
import FormItem from '../form/form-item.vue'
import { getObject } from '@/utils';
const props = withDefaults(
    defineProps<{
        rules?: any
        // 表单类型
        formType?: string

        // 字典展示
        option?: any[]
        optionLabel?: string
        optionValue?: string


        // 原生的属性
        // 表格类型 selection / index / expand  / select
        type?: string
        label?: string
        index?: string
        columnKey?: string
        prop?: string
        width?: string
        minWidth?: string
        fixed?: true | 'left' | 'right'
        renderHeader?: Function
        sortable?: 'custom' | false
        sortMethod?: Function
        sortBy?: Function
        sortOrders?: any[]
        resizable?: boolean
        formatter?: Function
        showOverflowTooltip?: any
        align?: 'left' | 'center' | 'right'
        headerAlign?: 'left' | 'center' | 'right'
        className?: string
        labelClassName?: string
        selectable?: Function
        reserveSelection?: boolean
        filters?: Array<{ text: string, value: string }>,
        filterPlacement?: string
        filterMultiple?: boolean
        filterMethod?: Function
        filteredValue?: any[]
    }>(),
    {
        label: '',
        option: () => [],
        optionLabel: 'label',
        optionValue: 'value',
        sortOrders: () => ['ascending', 'descending', null],
        resizable: true,
        showOverflowTooltip: undefined,
        align: 'left',
        headerAlign: undefined,
        filterMultiple: true
    }
)

const rules = inject<any>('rules')
</script>

<template>
    <el-table-column v-bind="$props">
        <!-- input -->
        <template #default="{ row, $index }" v-if="formType">
            <FormItem :prop="'list.' + $index + '.' + prop" :rules="props.rules || rules[prop]" v-bind="$attrs"
                :type="formType" :option="option" :option-label="optionLabel" :option-value="optionValue">
            </FormItem>
        </template>
        <!-- 字典展示 -->
        <template #default="{ row }" v-else-if="type == 'select'">
            {{ getObject(option, optionValue, row[prop], optionLabel) }}
        </template>
    </el-table-column>
</template>

<style lang='scss'>
.el-table .el-form-item {
    margin-bottom: 0;

    &.is-error {
        margin-bottom: 18px;
    }
}
</style>