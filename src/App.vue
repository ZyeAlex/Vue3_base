<script setup lang="ts">
import { RouterView } from 'vue-router'

document.documentElement.setAttribute('data-theme', 'white')
</script>

<template>
  <div >
    你好，世界！
  </div>
  <RouterView />
</template>


<style lang="scss">
@import '@/styles/theme/index.scss';
</style>