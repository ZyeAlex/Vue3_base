<script setup lang="ts">
import { reactive, ref } from 'vue'
const formRef = ref()
const form = reactive({
    name: 'cxk',
    age: 18,
    sex: 0,
    font: ['sing', 'jump', 'rap', 'basketball'],
    message: '你好，世界！',
    onOff: true,
    skill: []

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
const skills = [
    {
        label: '游泳',
        value: 'swimming'
    }, {
        label: '唱歌',
        value: 'sing'
    }, {
        label: '跳舞',
        value: 'dance'
    },
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
        { min: 4, max: 5, message: 'Length should be 3 to 5', trigger: 'change' },
    ],
})
const submit = async () => {
    // 表单校验
    await formRef.value.validate()
    console.log(form)
}
</script>

<template>
    <div class="test">
        <c-form ref="formRef" v-model="form" :rules="rules">
            <c-form-item label="姓名" prop="name" maxlength="7" />
            <c-form-item label="年龄" prop="age" type="number" />
            <c-form-item label="性别" prop="sex" type="select" :option="sex"></c-form-item>
            <c-form-item label="爱好" prop="font" type="select" :option="font" multiple></c-form-item>
            <c-form-item label="开关" prop="onOff" type="switch" />
            <c-form-item label="技能" prop="skill" type="checkbox" :option="skills" />
            <c-form-item label="信息" prop="message" type="textarea" />
        </c-form>
        <el-button @click="submit">提交</el-button>
    </div>
</template>

<style lang="scss" scoped>
.test {
    position: relative;
    width: 500px;
    margin: 50px;
}
</style>