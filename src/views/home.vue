<script setup lang="ts">
import Theme from '@/components/theme/theme.vue'
import FormTest from '@/components/element/form/test.vue'
import AxisTest from '@/components/echarts/axis/test.vue'
import IconTest from '@/components/icon/test.vue'
</script>

<template>
    <theme></theme>
    <form-test />
    <div class="text p-1 m-1 ml-3 px-4 b-3 ellipsis-3 frc">
        <span class="font-super">test</span>
        <span class="font-24 font-weight-600">test</span>
    </div>
    <icon-test></icon-test>
    <axis-test />
</template>


<style lang="scss"></style>