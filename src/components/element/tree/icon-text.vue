<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-12-05
 -->

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon: string,
        text: string
    }>(),
    {
        icon: 'svg:icon',
        text: '文字'
    }
)
</script>

<template>
    <div class="icon-text">
        <slot name="icon">
            <c-icon :icon="props.icon"></c-icon>
        </slot>
        <span style="padding-left:5px">
            <slot name="text">
                {{ text }}
            </slot>
        </span>
    </div>
</template>

<style lang='scss' scoped>
.icon-text {
    padding:3px;
    margin:3px 0;
    cursor: pointer;
    &>* {
        vertical-align: middle;
    }
}
</style>