<template>
  <div style="width: 100vw; height: 100vh; overflow: hidden">
    <van-nav-bar
      title="我的信息"
      style="background-color: rgba(0, 0, 0, 0.1)"
    />
    <div class="mes">
      <div class="info">
        <van-image
          width="100"
          height="100"
          round
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <div class="text">
          <h2>Ye</h2>
          <div class="account">1657294032</div>
        </div>
      </div>
    </div>
    <el-card
      style="max-width: 95%; margin: 0.3125rem auto"
      @click="router.push('/history')"
      >借阅历史</el-card
    >
    <el-card
      style="max-width: 95%; margin: 0.3125rem auto"
      @click="toScan('back')"
      >我要还书</el-card
    >
    <el-card
      style="max-width: 95%; margin: 0.3125rem auto"
      @click="toScan('add')"
      >书籍录入</el-card
    >
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { watch, ref } from "vue";
import { usebookstore } from "@/stores";
const bookstore = usebookstore();
const type = ref<"" | "back" | "add">("");
watch(
  () => bookstore.getbookIBSN,
  (newVal) => {
    if (newVal !== "") {
      if (type.value === "back") {
        console.log("我要还书");
      } else if (type.value === "add") {
        console.log("书籍录入");
      }
      bookstore.setbookIBSN("");
      type.value = "";
    }
  },
  {
    immediate: true,
  }
);
const toScan = (t: "back" | "add") => {
  type.value = t;
  router.push("/scanPage");
};
</script>
<style scoped lang="less">
.mes {
  padding-top: 20px;
  background-image: url("@/assets/bg.jpg");
  background-size: cover; /* 让背景图铺满 */
  background-position: center; /* 使背景图居中 */
  background-repeat: no-repeat;
  height: 11.25rem;
  display: flex;
  align-items: end;
  padding-bottom: 20px;
  justify-content: space-between;
  .info {
    width: fit-content;
    margin-left: 10%;
    display: flex;
    height: 100px;
    .text {
      margin-top: 20px;
      margin-left: 20px;
      height: 5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h2 {
        margin: 0;
      }
      .account {
        margin-top: 10px;
        font-size: medium;
        font-weight: 500;
      }
    }
  }
}
.choose {
  padding-top: 30px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
