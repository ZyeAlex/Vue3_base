<script setup lang="ts">
import { useThemeStore } from '@/store/theme';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const { theme } = storeToRefs(useThemeStore());
const themes = [
    {
        label: '亮黑',
        value: 'dark'
    }, {
        label: '默认',
        value: 'light',
    }
]
const themeChangeHandle = (val: any) => {
    theme.value = val
    window.document.documentElement.setAttribute('data-theme', val);
}
onMounted(() => {
    window.document.documentElement.setAttribute('data-theme', 'light');
})
</script>

<template>
    <div class="check-theme">
        <el-radio-group v-model="theme" @change="themeChangeHandle">
            <el-radio-button :label="theme.value" v-for="theme in themes" :key="theme.value">{{ theme.label
            }}</el-radio-button>
        </el-radio-group>
    </div>
</template>

<style scoped></style>
