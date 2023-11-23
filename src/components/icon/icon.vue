<script setup lang="ts">
import { computed, unref, withDefaults, type Ref } from 'vue'
import { ElIcon } from 'element-plus'
import { Icon } from '@iconify/vue'
const props = withDefaults(defineProps<{
  // icon name
  icon: string,
  // icon color
  color: string,
  // icon size
  size: number, 
  hoverColor: string, // 悬浮切换颜色
  isTheme: boolean, // 是否需要切换主题色
  
}>(), {
  // icon name
  icon: '',
  // icon color
  color: '',
  // icon size
  size: 16,
  hoverColor: '',
  isTheme: false
})

const isLocal = computed(() => props.icon.startsWith('svg-icon:'))

const symbolId = computed(() => {
  return unref(isLocal) ? `#icon-${props.icon.split('svg-icon:')[1]}` : props.icon
})

const getIconifyStyle = computed(() => {
  const { color, size } = props
  return {
    fontSize: `${size}px`,
    color
  }
})
</script>

<template>
  <ElIcon class="iconify" :size="size" :color="color">
    <svg :class="{ 'svg-hover': hoverColor, 'svg-theme': isTheme }" v-if="isLocal" aria-hidden="true">
      <use :xlink:href="symbolId" :fill="color" />
    </svg>
    <Icon :class="{ 'svg-hover': hoverColor,  'svg-theme': isTheme }" v-else :icon="icon" :style="getIconifyStyle" />
  </ElIcon>
</template>

<style lang="scss" scoped>
.iconify {
  cursor: pointer;
  .svg-theme {
    use {
      color: v-bind(hoverColor) !important;
      @include useTheme {
        fill: getVar(iconColor);
      }
    }
    @include useTheme {
        color: getVar(iconColor) !important;
      }
  }
  .svg-hover:hover {
    use {
      fill: v-bind(hoverColor);
    }
    
    color: v-bind(hoverColor) !important;
  }
}
</style>
