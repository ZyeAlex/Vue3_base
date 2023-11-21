<!--
 * @Description: 资源展示/编辑的组件   代替 资源 规划的手动编辑 和 Echarts-resource
 * @Author: zye
 * @Date: 2023-05-22 
 * @LastEditors: zye
 * @LastEditTime: 2023-05-22
 *
 * @example:
 * :range="[13000, 14000]"
 * :data="[
      {
        name:'资源段1',
        freqBegin:13050,
        freqEnd:13950,
        usages:[
          {
            name:'资源段1',
            freqBegin:13100,
            freqEnd:13200,
          }
        ]
      }
    ]"
    :use="[
      {
        name:'资源段1',
        freqBegin:13100,
        freqEnd:13200,
      }
    ]"
    :select="[
      {
        name:'资源段1',
        freqBegin:13100,
        freqEnd:13200,
      }
    ]"
-->

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axis from './axis/index.vue'
import { Num, TinyColor, slicing } from '@/utils'

const props = withDefaults(
  defineProps<{
    xAxis: any
    data: any[]
    use: any[]
    select: any[]
    themeColor?: string
    xLabel?: boolean
    colors: string[]
  }>(),
  {
    themeColor: '#0078ff',
    data: () => [],
    use: () => [],
    select: () => [],
    colors: () => ['red', 'green', 'blue', 'yellow'],
  }
)
</script>

<template>
  <axis top="0" left="30" right="30" :data-zoom="false" :bottom="25" :legend="false" :x-axis="{
    max: 1,
    axisLabel: {
      color: props.themeColor,
      formatter: (arg: any) => {
        return Num((xAxis.freqEnd - xAxis.freqBegin) * arg + xAxis.freqBegin, 2);
      },
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  }" :y-axis="{
  type: undefined,
  inverse: true,
  data: [''],
  axisLabel: {
    show: false,
  },
  axisTick: {
    show: false,
  },
  axisLine: {
    show: false,
  },
  splitLine: {
    lineStyle: {
      type: 'dashed',
      color: '#aaa4',
    },
    show: false,
  },
}" :series="slicing(xAxis, data, use, select).map((v: any) => ({
  type: 'bar',
  stack: 'bar',
  barWidth: '100%',
  legendHoverLink: false,
  label: {
    show: false,
  },
  itemStyle: {
    color: colors[v.type],
  },
  data: [
    {
      data: v,
      value: (v.freqEnd - v.freqBegin) / (xAxis.freqEnd - xAxis.freqBegin),
    },
  ],
}))
  " />
</template>

<style scoped></style>
