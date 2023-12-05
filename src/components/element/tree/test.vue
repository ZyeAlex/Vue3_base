<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-12-05
 -->

<script setup lang="ts">
import { ref } from 'vue'
import iconText from './icon-text.vue';
const defaultProps = {
    children: 'children',
    label: 'label',
}
const data = [
    {
        label: 'Level one 1',
        children: [
            {
                label: 'Level two 1-1',
                children: [
                    {
                        label: 'Level three 1-1-1',
                    },
                ],
            },
        ],
    },
    {
        label: 'Level one 2',
        children: [
            {
                label: 'Level two 2-1',
                children: [
                    {
                        label: 'Level three 2-1-1',
                    },
                ],
            },
            {
                label: 'Level two 2-2',
                children: [
                    {
                        label: 'Level three 2-2-1',
                    },
                ],
            },
        ],
    },
    {
        label: 'Level one 3',
        children: [
            {
                label: 'Level two 3-1',
                children: [
                    {
                        label: 'Level three 3-1-1',
                    },
                ],
            },
            {
                label: 'Level two 3-2',
                children: [
                    {
                        label: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    },
]
</script>

<template>
    <div class="container">
        <c-tree :data="data" :props="defaultProps" >
            <template #more>
                <icon-text icon="ep:plus" text='添加' />
                <icon-text icon="ep:delete" text="删除" />
            </template>
        </c-tree>
    </div>
</template>

<style lang='scss' scoped>
.container {
    width: 300px;
}
</style>