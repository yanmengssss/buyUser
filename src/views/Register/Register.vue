<template>
  <div class="box">
    <el-card
      style="
        /* max-width: 40rem; */
        width: 95%;
        margin: 5rem auto;
        background-color: rgba(255, 255, 255, 0.5);
        text-align: center;
        /* padding: 20px; */
      "
    >
      <template #header>
        <div class="head">
          <div style="display: flex; align-items: center">
            <img src="@/assets/logo.png" alt="" />
            <h3>东莞理工学院 <br />图书使用中心</h3>
          </div>
        </div>

        <h2 style="text-align: center">请注册</h2>
      </template>
      <el-form label-width="auto" style="width: 100%" :rules="rules">
        <el-form-item
          :label="item.label"
          v-for="(item, index) in state"
          :key="index"
          size="large"
          :prop="item.name"
        >
          <el-input
            v-model="item.val"
            :type="item.type"
            :placeholder="item.ph"
            :style="{ width: item.name === 'code' ? '70%' : '100%' }"
          />
          <el-button
            type="primary"
            size="large"
            v-if="item.name == 'code'"
            style="margin-left: 0.3125rem"
            :disabled="time != '发送'"
            @click="sendCode"
            >{{ time }}</el-button
          >
        </el-form-item>
      </el-form>

      <div
        style="
          display: flex;
          justify-content: flex-end;
          margin: 20px 0;
          padding-right: 30px;
        "
      >
        <el-space wrap :size="30">
          <el-space wrap :size="30">
            <el-text
              class="mx-1"
              type="primary"
              @click="() => router.push('/login')"
              >登录</el-text
            >
            <el-text
              class="mx-1"
              type="primary"
              @click="() => router.push('/findWord')"
              >忘记密码</el-text
            >
          </el-space>
        </el-space>
      </div>
      <div style="width: 100%; text-align: center; margin-top: 40px">
        <el-button type="primary" size="large">登录</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { reactive, computed, watch, ref } from "vue";
import { inputType } from "@/config";
import { useTimerStore } from "@/stores";
const timeStore = useTimerStore();
const time = ref<number | "发送">("发送"); // 初始值设为“发送”

watch(
  [() => timeStore.timer, () => timeStore.status],
  ([newVal, newStatus]) => {
    // 修正回调函数的参数解构
    if (newStatus) {
      time.value = newVal; // 更新时间
    } else {
      if (localStorage.getItem("time")) {
        timeStore.setstatus(true);
      } else time.value = "发送"; // 恢复为“发送”
    }
  },
  { immediate: true } // 立即执行
);

const sendCode = () => {
  timeStore.setstatus(true);
};
const state = reactive<inputType[]>([
  {
    name: "account",
    label: "学号",
    ph: "请输入学号",
    type: "text",
    val: "",
  },
  {
    name: "phone",
    label: "手机号",
    ph: "请输入手机号",
    type: "text",
    val: "",
  },
  {
    name: "code",
    label: "验证码",
    ph: "请输入验证码",
    type: "text",
    val: "",
  },
  {
    name: "password",
    label: "密码",
    ph: "请输入密码",
    type: "text",
    val: "",
  },
  {
    name: "repassword",
    label: "确认密码",
    ph: "再次输入密码",
    type: "text",
    val: "",
  },
]);
const validateRepassword = (rule, value, callback) => {
  if (value !== state[2].val) {
    // 2 是 password 的索引
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback(); // 验证通过
  }
};
const rules = {
  account: [{ required: true, message: "学号不能为空", trigger: "blur" }],
  phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    {
      pattern: /^[1][3-9][0-9]{9}$/,
      message: "手机号格式不正确",
      trigger: "blur",
    },
  ],
  code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
  password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
  repassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    { validator: validateRepassword, trigger: "blur" }, // 自定义验证
  ],
};
</script>
<style scoped lang="less">
.box {
  left: 0;
  top: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: url("@/assets/bg.jpg") no-repeat left bottom;
  background-size: cover; /* 可选：确保背景图像覆盖整个元素 */
}
.head {
  //   margin-top: 5rem;
  text-emphasis: none;
  display: flex;
  height: 6.25rem;
  align-items: center;
  justify-content: space-evenly;
  img {
    width: 8.25rem;
    height: 6.25rem;
  }
}
</style>
