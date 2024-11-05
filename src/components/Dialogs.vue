<template>
  <van-dialog
    v-model:show="props.show"
    :title="props.title"
    show-cancel-button
    showConfirmButton
    overlay
    @confirm="props.confirm"
    @cancel="props.cancel"
    @close="props.cancel"
  >
    <template #default>
      <slot name="default"></slot>
    </template>
  </van-dialog>
</template>
<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  title: string;
  confirm: () => void;
  cancel: () => void;
}>();
</script>
<style lang="less" scoped></style>
