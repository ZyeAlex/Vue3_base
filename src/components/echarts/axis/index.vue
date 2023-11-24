<!--
 * @Description: 柱状图与折线图
 * @Author: Zye
 * @Date: 2023-03-25
 * @LastEditors: Zye
 * @LastEditTime: 2023-03-25
 -->

<script setup lang="ts">
import { debounce } from "@/utils";
import { onMounted, ref, watch } from "vue";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
import useChart from "./chart";
type o = {
  [key: string]: any;
};

const props = withDefaults(
  defineProps<{
    /**
     * series 必传
     */
    series: any[];
    /**
     * xAxis 必传 传 X轴配置项或xlabel数组
     */
    xAxis: o[] | o;
    yAxis?: o[] | o;
    color?: string;
    /**
     * legend  传 true 或 object配置项
     *
     * legend.positoin legend位置，传 left/right
     *
     */
    legend?: boolean | o;
    /**
     * grid   传 true 或 object配置项
     *
     * grid 的配置项已被解构  可以直接传 入 top/left/right/bottom 来设置
     *
     */
    grid?: o;
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
    _endIndex?: number;
    /**
     * tooltip   传 true 、 数组 或 object配置项
     *
     * tooltip 为 数组 可以传 ['{value}个','{value}%'] 来进行配置
     *
     */
    tooltip?: boolean | o;
    dataZoom?: boolean | o;
  }>(),
  {
    series: () => [],
    color: "#000",
    left: "8%",
    top: "10%",
    right: 0,
    bottom: "20px",
    legend: true,
    tooltip: true,
    dataZoom: true,
  }
);
// 设置echarts
const axis = ref();
const {
  initChart,
  setChart,
  indexChange,
  startIndex,
  endIndex,
  getDataLength,
} = useChart(props);
onMounted(() => {
  //初始化
  initChart(axis);
  // 监听数据响应式刷新图表
  watch(props, debounce(setChart), {
    deep: true,
    immediate: true,
  });
});
</script>

<template>
  <div class="axis">
    <div class="echart" ref="axis"></div>
    <el-icon class="btn btn_left" @mousedown="indexChange(-1)" @mouseup="indexChange()"
      v-show="startIndex > 0"><arrow-left-bold /></el-icon>
    <el-icon class="btn btn_right" @mousedown="indexChange(1)" @mouseup="indexChange()"
      v-show="endIndex < getDataLength() - 1"><arrow-right-bold /></el-icon>
  </div>
</template>

<style lang="scss" scoped>
.axis {
  width: 100%;
  height: 100%;
  position: relative;

  .echart {
    width: 100%;
    height: 100%;
  }

  :deep(.btn) {
    position: absolute;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
  }

  :deep(.btn_left) {
    left: 0px;
  }

  :deep(.btn_right) {
    right: 0px;
  }
}
</style>
