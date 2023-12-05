<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-12-05
 -->

<script setup lang="ts">
import { useSlots } from 'vue';

const handleNodeClick = (data) => {
    console.log(data)
}

const props = withDefaults(defineProps<{
    data: any[]
    props: {
        label: any,
        children: any
    },
    position: boolean
}>(), {
    props: () => ({
        children: 'children',
        label: 'label',
    }),
    position: false
})
const slots = useSlots()

</script>

<template>
    <div class="tree" :class="{ position }">
        <el-tree style="width:100%;height:100%" :data="data" :props="props.props" @node-click="handleNodeClick">
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <span>
                        <!-- 标题插槽 -->
                        <slot :node="node" :data="data">
                            {{ node[props.props.label] }}
                        </slot>
                    </span>
                    <span>
                        <!-- 拓展插槽 -->
                        <slot name="sufix" :node="node" :data="data"></slot>
                        <!-- 更多插槽 -->
                        <el-popover placement="right-start" :width="100" trigger="hover">
                            <slot name="more" :node="node" :data="data"></slot>
                            <template #reference>
                                <c-icon icon="ep:more-filled" v-if="slots.more"></c-icon>
                            </template>
                        </el-popover>
                    </span>
                </span>
            </template>
        </el-tree>
    </div>
</template>

<style lang='scss' scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}

.position {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;

    &>* {
        position: absolute;
        width: 100%;
        height: 100%;
    }
}
</style>