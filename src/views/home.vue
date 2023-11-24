<script setup lang="ts">
import Theme from '@/components/theme/theme.vue'
import FormTest from '@/components/element/form/test.vue'
import AxisTest from '@/components/echarts/axis/test.vue'
</script>

<template>
    <theme></theme>
    <VIcon icon="svg-icon:icon" size="30" :is-theme="true"></VIcon>
    <VIcon icon="ep:search" :size="30" color="var(--el-color-primary)" :is-theme="true" hover-color="var(--el-color-info)" />
    <div class="text p-1 m-1 ml-3 px-4"></div>
    <form-test />
    <axis-test />
</template>


<style lang="scss"></style>