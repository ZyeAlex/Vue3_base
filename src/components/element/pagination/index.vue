<!--
 * @Description:  后台分页 （前台数据分页见组件 pagination-native）
 * @Author: Zye
 * @Date: 2022-07-04
 * @LastEditors: Zye
 * @LastEditTime: 2022-07-30
 *
 * @example:
  
  //template
  <Pageination ref="page" @change="change" />
  
  //params
  const page = ref() //组件

  //callback
  async function change(pageSize,pageNum,setTotal){
    const {data,total} = await getData(pageSize,pageNum)   //获取数据
    setTotal(total)             //设置页码的total
  }

  //methods
  page.value.change(is-reset) //触发远程搜索(是否初始化页码/页面容量，默认为true)
  
 -->
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
const props = withDefaults(
  defineProps<{
    layout: string[]
    sizes: number[]
    init: boolean
    pagerConut: number
    background: boolean
    change?: any
    autoHidden?: boolean
  }>(),
  {
    init: true,
    layout: () => ['total', 'sizes', 'prev', 'pager', 'next'],
    sizes: () => [15, 30, 50, 100],
    pagerConut: 5,
    background: true,
    autoHidden: true,
  }
)
// 数据总数 , 数据量 ， 页码
const total = ref(0)
const pageSize = ref<number>(props.sizes[0] as number)
const pageNum = ref(1)
// 暴露属性
defineExpose({
  pageSize,
  pageNum,
  total,
  change,
  setTotal,
})
const emit = defineEmits(['change'])
// 初始化
onMounted(() => props.init && change())
// 触发事件
watch(() => props.change, change, { deep: true })

// 设置总条数
function setTotal(number: number = total.value) {
  total.value = number
  // 当当前页码无数据，则往前翻页并重新调取数据
  if (total.value < (pageNum.value - 1) * pageSize.value && pageNum.value > 1) {
    pageNum.value--
    change(false)
  }
}
// 页容量发生改变
function sizeChange(number: number) {
  pageSize.value = number
  let maxNum: number
  if ((maxNum = Math.ceil(total.value / pageSize.value)) < pageNum.value) {
    pageNum.value = maxNum
  }
  change(false)
}
// 页码发生改变
function numberChange(number: number) {
  pageNum.value = number
  change(false)
}
// 触发事件
function change(isReset = true) {
  if (isReset) {
    pageSize.value = props.sizes[0] as number
    pageNum.value = 1
    total.value = 0
  }
  emit('change', pageSize.value, pageNum.value, setTotal)
}
</script>
<template>
  <el-pagination
    small
    :background="background"
    :pager-conut="pagerConut"
    :layout="layout.join(',')"
    :total="total"
    :current-page="pageNum"
    :page-size="pageSize"
    :page-sizes="sizes"
    @size-change="sizeChange"
    @current-change="numberChange"
    v-show="autoHidden ? total : true"
    style="padding: 10px 0 0 0"
  >
  </el-pagination>
</template>
