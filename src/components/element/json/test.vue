<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-11-27
 -->

<script setup lang="ts">
import { ref } from 'vue'
import json from './index.vue'
const jsonRef = ref()
const msg = {
    name: 'fsk',
    skills: [{
        label: '唱歌',
        value: 'sing'
    }, {
        label: '跳舞',
        value: 'dance'
    },
    ],
}

const getJSON = () => {
   console.log('——object——>',jsonRef.value.getObject());
   console.log('——json————>',jsonRef.value.getJSON());
}

</script>

<template>
    <json ref="jsonRef" :data="msg" />
    <el-button @click="getJSON">获取JSON</el-button>
</template>
