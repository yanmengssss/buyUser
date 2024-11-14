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

        <h2 style="text-align: center">登录</h2>
      </template>
      <el-form label-width="auto" style="width: 100%">
        <el-form-item
          :label="item.label"
          v-for="(item, index) in state"
          :key="index"
          size="large"
          :prop="`item_${item.name}`"
        >
          <el-input
            v-model="item.val"
            :type="item.type"
            :placeholder="item.ph"
            width="10rem"
          />
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
              @click="() => router.push('/register')"
              >注册</el-text
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
        <el-button type="primary" size="large" @click="gologin">登录</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { reactive } from "vue";
import { inputType } from "@/config";
import { login } from "@/apis/api";
const state = reactive<inputType[]>([
  {
    name: "account",
    label: "账号",
    ph: "请输入账号",
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
]);

const gologin = async () => {
  if (state[0].val && state[1].val) {
    let data = {
      account: state[0].val,
      password: state[1].val,
    };
    const res = await login(data);
    if (res.code == "0") {
      ElMessage.success("登录成功");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.userId);
      localStorage.setItem("pre", res.data.right);
      router.push("/home");
    } else {
      ElMessage.error(res.data);
    }
  } else {
    ElMessage.error("账号或密码不能为空");
  }
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
