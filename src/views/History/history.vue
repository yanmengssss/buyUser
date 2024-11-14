<template>
  <van-nav-bar
    title="借阅历史"
    style="background-color: rgba(0, 0, 0, 0.1)"
    left-arrow
    @click-left="onClickLeft"
  />
  <HistoryCard></HistoryCard>
  <HistoryCard></HistoryCard>
  <HistoryCard></HistoryCard>
</template>
<script setup>
import HistoryCard from "@/components/HistoryCard.vue";
import { onMounted } from "vue";
import router from "@/router";
const onClickLeft = () => router.push("/home");
onMounted(() => {});
</script>
<style scoped lang="less"></style>
