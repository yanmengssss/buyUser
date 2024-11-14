<template>
  <el-card style="max-width: 90%; margin: 0.3125rem auto">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template #title>
          <el-text class="mx-1">{{ props.title }}</el-text>
          <van-icon name="fire-o" color="#ee0a24" v-if="props.hot > 10" />
        </template>
        <el-descriptions direction="vertical" :column="1" size="small" border>
          <el-descriptions-item label="书名">{{
            props.title
          }}</el-descriptions-item>
          <el-descriptions-item label="出版社">{{
            props.publish
          }}</el-descriptions-item>
          <el-descriptions-item label="作者">{{
            props.author
          }}</el-descriptions-item>
          <el-descriptions-item label="IBSN">{{
            props.ISBN
          }}</el-descriptions-item>
          <el-descriptions-item label="类型">{{
            props.type
          }}</el-descriptions-item>
          <el-descriptions-item label="位置">F-5-3-21</el-descriptions-item>
          <el-descriptions-item label="介绍">
            {{ props.introduce }}
          </el-descriptions-item>
        </el-descriptions>
        <el-button
          type="primary"
          size="small"
          style="margin-top: 10px; float: right; margin-right: 10px"
          >借阅</el-button
        >
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps<{
  title: string;
  publish: string;
  type: string;
  author: string;
  ISBN: string;
  introduce: string;
  location: string;
  hot: number;
  id: string;
}>();
const activeName = ref("0"); // 设置初始值
</script>

<style scoped lang="less">
:deep(.el-collapse-item__content) {
  padding: 0;
}

.el-card {
  border-radius: 10px;
}

.el-button {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
