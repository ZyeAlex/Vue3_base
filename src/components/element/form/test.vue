<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
    name: 'cy',
    age: 80,
    sex: 0,
    message: '你好，世界！'
})
setTimeout(() => {
    console.log(form);
}, 1000);
</script>

<template>
    <v-form v-model="form">
        <v-form-item label="姓名" prop="name" />
        <v-form-item label="年龄" prop="age" type="number" />
        <v-form-item label="性别" prop="sex" type="select" option=""  ></v-form-item>
        <v-form-item label="信息" prop="message" />
    </v-form>
</template>

<style lang="scss" scoped></style>