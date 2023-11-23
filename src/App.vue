<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <Theme></Theme>
    <VIcon icon="svg-icon:icon" size="30" :is-theme="true"></VIcon>
    <VIcon icon="ep:search" :size="30" color="var(--el-color-primary)" :is-theme="true" hover-color="var(--el-color-info)" />
    <div class="text p-1 m-1 ml-3 px-4"></div>
  </header>
  <RouterView />
</template>


<style lang="scss" scoped>
.text {
  width: 100px;
  height: 100px;
  @include useTheme {
    border: 1px solid getVar(textColor);
  }
}

</style>