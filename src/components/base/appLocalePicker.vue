<script setup lang="ts">
// import { useStorage } from "@vueuse/core";
// import { useI18n } from "vue-i18n";
import { useI18n } from "vue-i18n";

import { Cache } from '@/utils';
const { locale } = useI18n();
// const emit = defineEmits(['changeLanguage']);
// const state = useStorage("locale", {
//   locale: "zh",
// });
// function changeLocale(val: string) {
//   locale.value = val;
//   state.value = { locale: val };
//   location.reload();
// }

function changeLanguage(val: string) {
  // console.log('i18n', i18n);
  locale.value = val;
  Cache.setLanguage(val);
  window.location.reload();

  // if (val == state.value.locale) return;
  // setLanguage(val);
  // state.value = { locale: val };
  // emit('changeLanguage');
}
</script>

<template>
  <div class="cp flex items-center px-2 h-full">
    <el-dropdown trigger="hover">
      <!-- <i inline-flex i="ic-sharp-translate" text-2xl /> -->
      <div class="flex">
        <span text-white text-sm fw700 v-if="Cache.getLanguage() != 'zh-cn'">EN</span>
        <span text-white text-sm fw700 v-else>ZH</span>
        <i i="ic-sharp-arrow-drop-down" class="text-#878C91" />
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="changeLanguage('zh-cn')">简体中文</el-dropdown-item>
          <el-dropdown-item @click="changeLanguage('en')">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped></style>
