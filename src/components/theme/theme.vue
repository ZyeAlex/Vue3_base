<script setup lang="ts">
import { useThemeStore } from '@/store/theme.ts';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore);
const themes = [
    {
        label: '亮黑',
        value: 'dark'
    }, {
        label: '默认',
        value: 'light',
    }
]
const themeChangeHandle = (val: string) => {
    themeStore.setTheme(val)
}
onMounted(() => {
    themeStore.initTheme();
})
</script>

<template>
    <div class="check-theme">
        <el-radio-group v-model="theme" @change="themeChangeHandle">
            <el-radio-button :label="theme.value" v-for="theme in themes" :key="theme.value">
                {{ theme.label }}
            </el-radio-button>
        </el-radio-group>
    </div>
</template>

<style scoped></style>
