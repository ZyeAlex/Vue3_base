<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
    name: 'XXX',
    age: 80,
    sex: [],
    message: '你好，世界！'
})
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

</script>

<template>
    <v-form v-model="form">
        <v-form-item label="姓名" prop="name" maxlength="5" />
        <v-form-item label="年龄" prop="age" type="number" :max="90" />
        <v-form-item label="性别" prop="sex" type="select" :option="sex" multiple></v-form-item>
        <v-form-item label="信息" prop="message" type="textarea" />
    </v-form>
    <el-button @click="() => console.log(form)">111</el-button>
</template>

<style lang="scss" scoped></style>