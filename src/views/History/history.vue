<template>
  <van-nav-bar
    title="购买历史"
    style="background-color: rgba(0, 0, 0, 0.1)"
    left-arrow
    @click-left="onClickLeft"
  />
  <HistoryCard
    v-for="item in historyList"
    :key="item.id"
    :rent-id="item.rentId"
    :book-id="item.id"
    :borrow-time="item.borrowTime"
    :return-time="item.returnTime"
    :status="item.status"
    :name="item.name"
    @on-return="setreturnbook"
  ></HistoryCard>
  <Dialogs :show="show" :title="'提醒'" :confirm="onconfirm" :cancel="onclose">
    <template #default>
      <div style="width: 100%; text-align: center">
        是否确定录入{{ borrowName }}？
      </div>
    </template>
  </Dialogs>
</template>
<script setup>
import HistoryCard from "@/components/HistoryCard.vue";
import { onMounted, ref } from "vue";
import router from "@/router";
import { borrowHistiry, returnBook } from "@/apis/api";
import dayjs from "dayjs";
import Dialogs from "@/components/Dialogs.vue";

const onClickLeft = () => router.push("/home");
const historyList = ref([]);
const total = ref(0);
const show = ref(false);
const onclose = () => (show.value = false);
const backbookId = ref("");
const backrentId = ref("");
const currentPage = ref(1);
const onconfirm = async () => {
  const temp = {
    bookId: backbookId.value,
    rentId: backrentId.value,
  };
  const res = await returnBook(temp);
  if (res.code == "0") {
    getHistory(currentPage.value);
    ElMessage.success("归还成功");
    show.value = false;
  } else {
    ElMessage.error(res.data);
  }
};
const setreturnbook = (data) => {
  console.log(data);
  backrentId.value = data.rentId;
  backbookId.value = data.bookId;
  show.value = true;
};
function isTodayOrAfter(date) {
  // 获取今天的日期
  const today = dayjs().startOf("day"); // 使用 `startOf('day')` 来确保比较的是日期而非时间

  // 格式化传入的日期
  const inputDate = dayjs(date).startOf("day");

  // 判断日期是否是今天或之后
  return inputDate.isTodayOrAfter(today, "day");
}

const getHistory = async (page) => {
  if (historyList.value.length >= total.value && total.value != 0) return;
  let temp = {
    pageSize: 100,
    pageNum: page,
    userId: localStorage.getItem("id"),
  };
  const res = await borrowHistiry(temp);
  res.data.items.forEach((item) => {
    historyList.value.push({
      id: item.bookId,
      rentId: item.rentId,
      name: item.bookName || "暂无",
      borrowTime: dayjs(item.createTime).format("YYYY-MM-DD") || "",
      returnTime: dayjs(item.anticipate).format("YYYY-MM-DD") || "",
      // status: item.status == 1 ? 1 : isTodayOrAfter(item.anticipate) ? 0 : 2,
    });
  });
  console.log(res);
};
onMounted(() => {
  getHistory(currentPage.value);
});
</script>
<style scoped lang="less"></style>
