<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
    name: 'XXX',
    age: 80,
    sex: 0,
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
    <div class="test">
        <v-form v-model="form">
            <v-form-item label="姓名" prop="name" maxlength="5" />
            <v-form-item label="年龄" prop="age" type="number" :max="90" />
            <v-form-item label="性别" prop="sex" type="select"></v-form-item>
            <v-form-item label="信息" prop="message" type="textarea" />
        </v-form>
        <el-button @click="() => console.log(form)">提交</el-button>
    </div>
</template>

<style lang="scss" scoped>
.test {
    position: relative;
    width: 500px;
    margin: 50px;
}
</style>