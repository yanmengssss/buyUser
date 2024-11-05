<template>
  <el-card style="max-width: 90%; margin: 0.3125rem auto">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template #title
          ><div
            style="
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span style="display: inline-block">c语言从入门到精通</span>
            <el-tag type="primary">已归还</el-tag>
          </div></template
        >
        <el-descriptions direction="vertical" :column="1" size="small" border>
          <el-descriptions-item label="书名"
            >c语言从入门到精通[专著]明日科技编著</el-descriptions-item
          >
          <el-descriptions-item label="IBSN"
            >9787302635673</el-descriptions-item
          >
          <el-descriptions-item label="借出时间"
            >2024-11-20 10-21-12
          </el-descriptions-item>
          <el-descriptions-item label="预计归还时间"
            >2024-11-20 10-21-12
          </el-descriptions-item>
          <el-descriptions-item label="实际归还时间"
            >2024-11-20 10-21-12
          </el-descriptions-item>
        </el-descriptions>
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
