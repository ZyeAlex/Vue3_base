<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-11-24
 -->

<script setup lang="ts">
const xData = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const y1Data = [2, 4, 6, 8, 3, 5, 7, 3, 7]
const y2Data = [5, 8, 4, 7, 6, 6, 0, 2, 6]
const series = [
            {
                name: 'y1',
                data: y1Data
            },
            {
                type: 'line',
                data: y2Data
            }
        ]
</script>

<template>
    <div class="container">
        <c-axis :x-axis="xData" :series="series" />
    </div>
</template>

<style lang='scss' scoped>
.container {
    width: 500px;
    height: 300px;
}
</style>