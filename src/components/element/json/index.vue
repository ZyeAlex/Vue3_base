<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-11-27
 -->

<script setup lang="ts">
import { ref } from 'vue'
import { JSONString } from './json'
import { ElMessage } from 'element-plus';
defineProps<{
    data: any
}>()
const jsonRef = ref()
const getObject = () => {
    const json = (jsonRef.value?.innerText)?.replace(/(\n)|(\s)/g, '')
    try {
        return JSON.parse(json)
    } catch (error) {
        ElMessage.error('JSON格式错误！')
    }
}
const getJSON = () => {
    return JSON.stringify(getObject())
}
defineExpose({
    getJSON,
    getObject
})

const keydown = (e: KeyboardEvent) => {
    if (e.key == 'Tab') {
        e.preventDefault()
        const selection = window.getSelection()
        var event = new KeyboardEvent('keydown', {
            key: ' ',
            code: 'Space',
            charCode: 32,
            keyCode: 32,
            view: window,
            bubbles: true,
        });
        selection.anchorNode.dispatchEvent(event);
    }
}
</script>

<template>
    <div @keydown="keydown" ref="jsonRef" v-html="JSONString(data)"></div>
</template>
