<script setup lang="ts">
import { ref } from 'vue'
import Theme from '@/components/theme/theme.vue'
import FormTest from '@/components/element/form/test.vue'
import AxisTest from '@/components/echarts/axis/test.vue'
import JsonTest from '@/components/element/json/test.vue'
import DialogTest from '@/components/element/dialog/test.vue'
import TableTest from '@/components/element/table/test.vue'
</script>

<template>
    <theme></theme>
    <VIcon icon="svg-icon:icon" size="30" :is-theme="true"></VIcon>
    <VIcon icon="ep:search" :size="30" color="var(--el-color-primary)" :is-theme="true"
    hover-color="var(--el-color-info)" />
    <div class="text p-1 m-1 ml-3 px-4"></div>
    <!-- <DialogTest /> -->
    <!-- <json-test /> -->
    <!-- <axis-test /> -->
    <form-test />
    <TableTest />
</template>


<style lang="scss"></style>