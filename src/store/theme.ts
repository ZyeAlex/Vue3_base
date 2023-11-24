import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref('light');
    const setTheme = (val: string) => {
        theme.value = val;
        window.document.documentElement.setAttribute('data-theme', theme.value);
    }
    const initTheme = () => {
        window.document.documentElement.setAttribute('data-theme', (import.meta?.env?.VITE_IS_THEME));
    }

    return { theme, setTheme, initTheme }
})
