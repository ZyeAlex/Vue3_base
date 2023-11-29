## 主题换肤
- themes.scss 基础样式文件
```
$themes: ( 
    light: ( // 亮主题
        bgColor: #fff,
        textColor: #000,
        iconColor: #0ed,
        borderColor: #000
    ),
    dark: ( // 暗主题
        bgColor: #000,
        textColor: #fff,
        iconColor: #ccc,
        borderColor: #0078ff,
    )
    // ... 其他主题色 颜色变量名 同上
)

```
- index.scss - 入口文件
```
@import './themes.scss';
$curTheme: 'dark';  // 设置默认样式

// 设置主题样式混入
@mixin useTheme() {
    // 遍历主题 map 生成对应样式
    @each $key, $value in $themes {
        // 获取当前样式 !global 提升为全局变量
        $curTheme: $key !global; 
        // 根据根节点 data-theme 属性 匹配不同样式 & 继承父级类名 @content; 占位符类似于 slot
        html[data-theme='#{$key}'] & {
            @content;
        }
    }
}

// 根据变量名 获取当前样式
@function getVar($paramName) {
    $themeMap: map-get($themes, $curTheme);
    @return map-get($themeMap, $paramName);
}
```
- store --> theme.ts // 样式store  

```
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    // 默认主题 todo（当前主题持久化存储）
    const theme = ref('light');
    // 设置主题 
    const setTheme = (val: string) => {
        theme.value = val;
        window.document.documentElement.setAttribute('data-theme', theme.value); // 设置根节点data-theme 属性 通过改变data-theme 属性值切换主题
    }
    // 初始化主题
    const initTheme = () => {
        window.document.documentElement.setAttribute('data-theme', (import.meta?.env?.VITE_IS_THEME)); 
    }

    return { theme, setTheme, initTheme }
```
- **Dome**
``` 
/**
* 文本颜色
* @param {string} 主题色变量名
*/
@mixin textColor($params) {
  @include useTheme {
    color: getVar($params)
  }
}
```

```
<script setup lang="ts">
</script>

<template>
  <div class='theme'>
    <span>主题色</span>
  </div>
</template>


<style lang="scss" scoped>
.theme {
  width: 100px;
  height: 100px;
  @include useTheme {
    border: 1px solid getVar(textColor);
    background: getVar(bgColor);
    color: getVar(textColor); 
  }
  // 或者直接引入定义好的混入
  @include textColor(textColor);
}
</style>
```



