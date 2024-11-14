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
            <span style="display: inline-block">{{ props.name }}</span>
            <el-tag type="primary" v-if="props.status == 1">已归还</el-tag>
            <el-tag type="warning" v-else-if="props.status == 0">未归还</el-tag>
            <el-tag type="error" v-else>已逾期</el-tag>
          </div></template
        >
        <el-descriptions direction="vertical" :column="1" size="small" border>
          <el-descriptions-item label="书籍ID"
            >{{ props.bookId }}
          </el-descriptions-item>
          <el-descriptions-item label="租借ID"
            >{{ props.rentId }}
          </el-descriptions-item>
          <el-descriptions-item label="借出时间"
            >{{ props.borrowTime }}
          </el-descriptions-item>
          <el-descriptions-item label="预计归还时间"
            >{{ props.returnTime }}
          </el-descriptions-item>
        </el-descriptions>
        <el-button
          v-if="props.status != 1"
          @click="
            emit('onReturn', { bookId: props.bookId, rentId: props.rentId })
          "
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
const emit = defineEmits(["onReturn"]);
const props = defineProps<{
  rentId: string;
  name: string;
  bookId: string;
  borrowTime: string;
  returnTime: string;
  status: number;
}>();
</script>
<style scoped lang="less">
:deep(.el-collapse-item__content) {
  padding: 0;
}
</style>
