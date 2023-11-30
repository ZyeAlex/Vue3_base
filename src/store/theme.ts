import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
     // 默认主题 todo（当前主题持久化存储）
    const theme = ref('light');
     // 设置主题 
    const setTheme = (val: string) => {
        theme.value = val;
        // 设置根节点data-theme 属性 通过改变data-theme 属性值切换主题
        window.document.documentElement.setAttribute('data-theme', theme.value);
    }
     // 初始化主题
    const initTheme = () => {
        window.document.documentElement.setAttribute('data-theme', 'light');
    }

    return { theme, setTheme, initTheme }
})
