<!--
 * @Description: 本地数据分页
 * @Author: Zye
 * @Date: 2022-10-31
 * @LastEditors: Zye
 * @LastEditTime: 2022-10-31
 *
 * @example:
 *
 *<PageinationNative :data="data" position>
   <template #default="{data,startIndex}">
    //data 分页后的数据
    //startIndex 分页后数据的起始下标
   </template>
 </PageinationNative>
 *
 -->

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import Pagination from './pagination.vue'
// DOM节点
const pageRef = ref()
const pageSize = ref(15)
const pageNum = ref(1)
const props = withDefaults(
  defineProps<{
    data: any[]
    layout?: string[] //源于ElementPlus
    sizes?: number[] //源于ElementPlus
    position?: boolean //是否让分页内部的内容脱离文档流且最大化，默认由内部撑开
  }>(),
  {
    data: () => [],
    position: false,
  }
)
if (props.sizes?.length) {
  pageSize.value = props.sizes[0]
}
const emit = defineEmits(['change'])
// 监听源data，生成新的data
const _data = computed(() => {
  // 起始和终止数据索引
  const start = (pageNum.value - 1) * pageSize.value
  const end = start + pageSize.value
  const data = props.data.slice(start, end)
  // 刷新分页
  change()
  // 回调change
  nextTick(() => emit('change', data))
  // 返回新的数据
  return data
})
// 页面变化事件
const change = (size?: number, num?: number, setTotal?: Function) => {
  // 保存分页信息
  size && (pageSize.value = size)
  num && (pageNum.value = num)
  // 设置分页组件状态
  !setTotal && nextTick(() => pageRef.value?.setTotal(props.data.length))
}
// 暴露出页面信息和change事件
defineExpose({
  pageSize,
  pageNum,
  change: (setTotal?: Function) => change(pageSize.value, pageNum.value, setTotal),
})
</script>

<template>
  <div :class="{ native: true, relative: position }">
    <div :class="{ content: true, relative: position }">
      <div class="content-in">
        <!-- data为分页后的数据，startIndex为数据起始索引 -->
        <slot :data="_data" :start-index="(pageNum - 1) * pageSize"></slot>
      </div>
    </div>
    <div class="page">
      <slot name="footerLeft"></slot>
      <Pagination :init="false" style="padding-top: 10px" @change="change" :layout="layout" :sizes="sizes"
        ref="pageRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.native {
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;

    .content-in {
      width: 100%;
      height: 100%;
    }
  }

  &.relative {
    width: 100%;
    height: 100%;
  }

  .content.relative {
    position: relative;
    &>*{
      position: absolute;
      height:100%;
      width: 100%;
    }
  }

  .page {
    display: flex;
    justify-content: flex-end;
    height: 40px;
  }
}</style>
