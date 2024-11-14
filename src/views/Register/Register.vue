<template>
  <div class="box">
    <el-card
      style="
        width: 95%;
        margin: 5rem auto;
        background-color: rgba(255, 255, 255, 0.5);
        text-align: center;
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
      <el-form label-width="auto" style="width: 100%">
        <el-form-item
          :label="item.label"
          v-for="(item, index) in state"
          :key="index"
          size="large"
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
          >
            {{ time }}
          </el-button>
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
            <!-- <el-text
              class="mx-1"
              type="primary"
              @click="() => router.push('/findWord')"
              >忘记密码</el-text
            > -->
          </el-space>
        </el-space>
      </div>
      <div style="width: 100%; text-align: center; margin-top: 40px">
        <el-button type="primary" size="large" @click="toRegister"
          >注册</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import router from "@/router";
import { useTimerStore } from "@/stores";
import { register } from "@/apis/api";

const formRef = ref(null);
const timeStore = useTimerStore();
const time = ref<number | "发送">("发送");

const state = reactive([
  { name: "account", label: "账号", ph: "请输入账号", type: "text", val: "" },
  { name: "nickname", label: "昵称", ph: "请输入昵称", type: "text", val: "" },
  {
    name: "password",
    label: "密码",
    ph: "请输入密码",
    type: "password",
    val: "",
  },
  {
    name: "repassword",
    label: "确认密码",
    ph: "再次输入密码",
    type: "password",
    val: "",
  },
]);

const toRegister = async () => {
  if (!state[0].val) {
    ElMessage.error("账号不能为空");
    return;
  }
  if (!state[1].val) {
    ElMessage.error("昵称不能为空");
    return;
  }
  if (!state[2].val) {
    ElMessage.error("密码不能为空");
    return;
  }
  if (state[2].val !== state[3].val) {
    ElMessage.error("两次输入的密码不一致");
    return;
  }

  const data = {
    account: state[0].val,
    password: state[2].val,
    name: state[1].val,
  };
  const res = await register(data);
  console.log(res);
  if (res.code == "0") {
    ElMessage.success("注册成功");
    router.push("/login");
  } else {
    ElMessage.error(res.mssage);
  }
};

const sendCode = () => {
  timeStore.setstatus(true);
};

watch(
  [() => timeStore.timer, () => timeStore.status],
  ([newVal, newStatus]) => {
    if (newStatus) {
      time.value = newVal as number;
    } else {
      if (localStorage.getItem("time")) {
        timeStore.setstatus(true);
      } else {
        time.value = "发送";
      }
    }
  },
  { immediate: true }
);
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
