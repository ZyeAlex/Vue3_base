<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
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