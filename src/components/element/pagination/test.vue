<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-11-24
 -->

<script setup lang="ts">
import { ref } from 'vue'
// 本地分页
const curData = [
    {
        name: 'cy',
        age: '18'
    },
    {
        name: 'fsk',
        age: '18'
    }
]
// 后台分页
const farData = ref([])
const getData = (pageSize: number, pageNumber: number, setTotal: (total: number) => void) => {
    // 这里获取接口，c-p组件会传入pagesize,pagenumber
    farData.value = [
        {
            name: 'cy',
            age: '18'
        },
        {
            name: 'fsk',
            age: '18'
        }
    ]
    // 设置总条数
    setTotal(2)
}
</script>

<template>
    <div class="container">
        <!-- 本地分页 -->
        <c-pagination-native :data="curData">
            <template #default="{ data }">
                <el-table :data="data">
                    <el-table-column label="姓名" prop="name" />
                    <el-table-column label="年龄" prop="age" />
                </el-table>
            </template>
        </c-pagination-native>
        <!-- 后台分页 -->
        <el-table :data="farData">
            <el-table-column label="姓名" prop="name" />
            <el-table-column label="年龄" prop="age" />
        </el-table>
        <c-pagination @change="getData" />
    </div>
</template>

<style lang='scss' scoped>
.container {
    width: 500px;
    margin: 50px;
}
</style>