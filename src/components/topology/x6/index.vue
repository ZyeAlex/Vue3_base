<!--
 * @Description:	X6
 * @Author: Zye
 * @Date: 2023-12-04
 -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import initState from './components/init'
import { onUnmounted } from 'vue';
const props = withDefaults(defineProps<{
    // 背景
    background: any,
    // 网格线
    grid: any,
    // 拖拽
    panning: boolean,
    // 缩放
    mousewheel: boolean
}>(), {
    panning: true,
    mousewheel: true
})
// x6节点
const x6 = ref<HTMLElement>()

/**
 * 初始化
 */
const {
    graph,//画布
    init//初始化
} = initState(x6, props)
/**
 * api
 */
// graph.resize(800, 600) // resize 画布大小
// graph.translate(20, 20) // 在 x、y 方向上平移画布
// graph.zoom(0.2) // 将画布缩放级别增加 0.2（默认为1）
// graph.zoom(-0.2) // 将画布缩放级别减少 0.2
// graph.zoomTo(1.2) // 将画布缩放级别设置为 1.2
// graph.zoomToFit({ maxScale: 1 })// 将画布中元素缩小或者放大一定级别，让画布正好容纳所有元素，可以通过 maxScale 配置最大缩放级别
// graph.centerContent() // 将画布中元素居中展示

onMounted(async () => {
    init()
})
onUnmounted(() => {
})
</script>

<template>
    <div ref="x6" class="x6"></div>
</template>

<style lang='scss' scoped>
.x6 {
    width: 100%;
    height: 100%;
}
</style>