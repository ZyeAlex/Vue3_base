<script setup lang="ts">
import { reactive, ref } from 'vue';
const formRef = ref();
const form = reactive({
  name: 'cxk',
  age: 18,
  sex: 0,
  font: ['sing', 'jump', 'rap', 'basketball'],
  message: '你好，世界！',
  onOff: true,
  skill: [],
  radio: 'sing',
});
const sex = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 0,
  },
];
const font = [
  {
    label: 'sing',
    value: 'sing',
  },
  {
    label: 'jump',
    value: 'jump',
  },
  {
    label: 'rap',
    value: 'rap',
  },
  {
    label: 'basketball',
    value: 'basketball',
  },
];
// const rules = reactive({
//   name: [
//     { required: true, message: '格式错误', trigger: 'change' },
//     { min: 4, max: 5, message: 'Length should be 4 to 5', trigger: 'change' },
//   ],
// });
const submit = async () => {
  // 表单校验
  await formRef.value.validate();
  console.log(form);
};
const value1 = ref('');
</script>

<template>
  <div class="test">
    <c-form ref="formRef" v-model="form" col="3" inline>
      <!-- col : 占用列数 -->
      <c-form-item label="姓名" prop="name" maxlength="7" col="2" />
      <c-form-item label="年龄" prop="age" type="number"  v-validate="rule().required().maxv(20).minv(10)"/>
      <!-- 百分比设置布局 -->
      <c-form-item label="性别" prop="sex" type="select" :option="sex" width="70%"></c-form-item>
      <c-form-item label="开关" prop="onOff" type="switch" width="30%" />
      <c-form-item label="爱好" prop="font" type="selects" :option="font" width="100%"></c-form-item>
      <c-form-item label="技能" prop="skill" type="checkbox" :option="font" />
      <c-form-item label="最擅长" prop="radio" type="radio" :option="font" />
      <c-form-item label="信息" prop="message" type="textarea" />
      <el-form-item label="信息123" prop="message2" v-required>
        <el-date-picker v-model="value1" type="datetime" placeholder="Select date and time" />
      </el-form-item>
      <c-form-item type="default"> </c-form-item>
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
