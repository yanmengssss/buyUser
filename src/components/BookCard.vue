<template>
  <el-card style="max-width: 90%; margin: 0.3125rem auto">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="c语言从入门到精通[专著]明日科技编著" name="1">
        <el-descriptions direction="vertical" :column="1" size="small" border>
          <el-descriptions-item label="书名"
            >c语言从入门到精通[专著]明日科技编著</el-descriptions-item
          >
          <el-descriptions-item label="出版社"
            >北京:清华大学出版社,2023</el-descriptions-item
          >
          <el-descriptions-item label="作者">明日科技编芝</el-descriptions-item>
          <el-descriptions-item label="IBSN"
            >9787302635673</el-descriptions-item
          >
          <el-descriptions-item label="位置">F-5-3-21</el-descriptions-item>
          <el-descriptions-item label="介绍">
            本书分为4篇，共29章，内容包括C语言概述、算法、数据类型、运算符与表达式、数据输入输出、选择结构、循环控制、数组、函数、指针、结构体和共用体、位运算、预处理、文件、内存管理、网络套接字编程、单词背记闯关游戏、学生信息管理系统、单片机基础和GSM短信控制家庭防盗报警系统。
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
const activeName = ref("");
</script>
<style scoped lang="less">
:deep(.el-collapse-item__content) {
  padding: 0;
}
</style>
