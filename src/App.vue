<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed } from 'vue';
import appLocalePicker from '@/components/base/appLocalePicker.vue';
import { useI18n } from 'vue-i18n';
const { locale, messages } = useI18n();
const locales = computed(() => (messages.value as any)![locale.value]);
</script>

<template>
  <el-config-provider :locale="locales">
    {{ $t('title') }}
    <div style="height: 120px"><appLocalePicker /></div>
    <RouterView />
  </el-config-provider>
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
