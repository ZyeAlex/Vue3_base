<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-11-29
 -->

<script setup lang="ts">
import { ref } from 'vue'
const dialog = ref()
const open = () => {
    dialog.value.open()
}

</script>

<template>
    <c-dialog ref="dialog">
        内容
        <template #footer="{ close }">
            <el-button @click="close">关闭</el-button>
        </template>
    </c-dialog>
    <el-button @click="open">打开弹窗</el-button>
</template>

<style lang='scss' scoped>
.container {}
</style>