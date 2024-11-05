<template>
  <div>
    <Home v-if="active == 'home'" />
    <My v-else />
  </div>
  <van-tabbar v-model="active" @change="(val) => commonStore.setPage(val)">
    <van-tabbar-item icon="home-o" name="home">查询</van-tabbar-item>
    <van-tabbar-item icon="search" name="my">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { usecommonStore } from "@/stores/modules/common";
import Home from "./home.vue";
import My from "./my.vue";
const commonStore = usecommonStore();
const active = computed(() => commonStore.getPage());
</script>
<style></style>
