<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
    name: 'fsk',
    age: 18,
    sex: 0,
    font:['sing','jump','rap','basketball'],
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

</script>

<template>
    <div class="test">
        <v-form v-model="form">
            <v-form-item label="姓名" prop="name" maxlength="5" />
            <v-form-item label="年龄" prop="age" type="number" :max="90" />
            <v-form-item label="性别" prop="sex" type="select" :option="sex"></v-form-item>
            <v-form-item label="爱好" prop="font" type="select" :option="font" multiple></v-form-item>
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