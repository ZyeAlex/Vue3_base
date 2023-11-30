<!--
 * @Description:	
 * @Author: Zye
 * @Date: 2023-11-29
 -->

<script setup lang="ts">
import { ref, reactive } from 'vue'
const people = [
    {
        name: 'cy',
        age: '18',
        sex: 0,
        company: 'cowave',
        font: ['sing']
    },
    {
        name: 'fsk',
        age: '18',
        sex: 1,
        company: 'cowave',
        font: ['rap']
    },
]
const sex = [
    {
        label: '男',
        value: 1
    },
    {
        label: '女',
        value: 0
    }
]
const company = [
    {
        value: 'cowave',
        label: '控维'
    }
]
const font = [
    {
        label: 'sing',
        value: 'sing'
    },
    {
        label: 'jump',
        value: 'jump'
    },
    {
        label: 'rap',
        value: 'rap'
    },
    {
        label: 'basketball',
        value: 'basketball'
    },
]
const rules = reactive({
    name: [
        { required: true, message: '格式错误', trigger: 'change' },
        { min: 2, max: 5, message: 'Length should be 4 to 5', trigger: 'change' },
    ],
    sex: [
        { required: true, message: '格式错误', trigger: 'change' },
    ],
})
</script>

<template>
    <c-table :data="people" :rules="rules">
        <c-table-column type="index" />
        <!-- 表单 -->
        <c-table-column label="名字" prop="name" form-type="text"></c-table-column>
        <c-table-column label="年龄" prop="age" form-type="text" ></c-table-column>
        <c-table-column label="性别" prop="sex" form-type="select" :option="sex"></c-table-column>
        <c-table-column label="爱好" prop="font" form-type="selects" :option="font" width="200px"></c-table-column>
        <!-- 字典解析 -->
        <c-table-column label="公司" prop="company" type="select" :option="company"></c-table-column>
    </c-table>
    <el-button>获取数据</el-button>
</template>

<style lang='scss' scoped>
.container {}
</style>