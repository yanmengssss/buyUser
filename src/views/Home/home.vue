<template>
  <van-nav-bar title="借阅大厅" style="background-color: rgba(0, 0, 0, 0.1)" />
  <!-- <el-button @click="() => router.push('/scanPage')">扫码</el-button> -->
  <van-search
    v-model="value"
    show-action
    left-icon="scan"
    background="#00000019"
    @click-left-icon="() => router.push('/scanPage')"
    placeholder="请输入搜索相关信息"
    @search="onSearch"
  >
    <template #action>
      <div @click="onSearch">搜索</div>
    </template>
  </van-search>
  <div class="cardList">
    <BookCard></BookCard>
    <BookCard></BookCard>
    <BookCard></BookCard>
  </div>
  <Dialogs :show="show" :title="title" :confirm="onconfirm" :cancel="onclose">
    <template #default>
      <p style="margin-left: 20px">是否借阅</p>
    </template>
  </Dialogs>
</template>
<script setup lang="ts">
import router from "@/router";
import { onMounted, watch, ref } from "vue";
import { usebookstore } from "@/stores";
import BookCard from "@/components/BookCard.vue";
import Dialogs from "@/components/Dialogs.vue";
const bookstore = usebookstore();
watch(
  () => bookstore.getbookIBSN,
  (newVal) => {
    if (newVal !== "") {
      bookstore.setbookIBSN("");
    }
  },
  {
    immediate: true,
  }
);
const emit = defineEmits(["onSearch"]);
const show = ref<boolean>(false);
const title = ref<string>("是否借阅");
const onSearch = () => {
  show.value = true;
};
const onconfirm = () => {
  show.value = false;
};
const onclose = () => {
  show.value = false;
};
const value = ref("");
</script>
<style scoped>
.cardList {
  margin-top: 0.625rem;
}
</style>
