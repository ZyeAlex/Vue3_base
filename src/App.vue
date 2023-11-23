<script setup lang="ts">
import { RouterView } from 'vue-router';
import Theme from '@/components/theme/theme.vue'
</script>

<template>
  <header>
    <Theme></Theme>
  </header>
  <RouterView />
</template>


<style lang="scss" scoped>

</style>