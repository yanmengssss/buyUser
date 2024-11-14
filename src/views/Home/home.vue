<template>
  <van-nav-bar title="借阅大厅" style="background-color: rgba(0, 0, 0, 0.1)" />
  <!-- <el-button @click="() => router.push('/scanPage')">扫码</el-button> -->
  <van-search
    v-model="value"
    show-action
    left-icon="scan"
    background="#00000019"
    @click-left-icon="() => router.push('/scanPage')"
    @clear="() => (value = '')"
    placeholder="标题或ISBN"
    @search="search"
  >
    <template #action>
      <div @click="search">搜索</div>
    </template>
  </van-search>
  <div class="cardList">
    <BookCard
      v-for="item in bookList"
      :key="item.id"
      :title="item.title"
      :publish="item.publish"
      :author="item.author"
      :ISBN="item.ISBN"
      :introduce="item.introduce"
      :location="item.location"
      :hot="item.hot"
      :time="item.time"
      :id="item.id"
      :type="item.type"
    ></BookCard>
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
import { getBookList } from "@/apis/api";
import Dialogs from "@/components/Dialogs.vue";
import { booktype } from "@/stores/common";
import dayjs from "dayjs";
const bookstore = usebookstore();
const toborrow = () => {};
onMounted(() => {
  getBook(currentPage.value);
});
const size = 10;
const currentPage = ref(1);
const total = ref(0);
const bookList = ref([]);
const getBook = async (pageNum: number) => {
  const res = await getBookList({
    pageSize: size,
    pageNum: pageNum,
  });
  res.data.items.forEach((item) => {
    if (item.status == 0) {
      bookList.value.push({
        id: item.bookId,
        title: item.bookName || "暂无书名",
        author: item.author || "暂无作者",
        ISBN: item.isbn,
        type: booktype[item.type]?.label || "暂不清楚",
        introduce: item.introduction || "暂无介绍",
        publish: item.publish,
        location: item.location || "暂无位置",
        hot: item.hot,
        time: dayjs(item.createTime).format("YYYY-MM-DD"),
      });
    }
  });
};
const search = () => {
  if (!value.value) {
    getBook(currentPage.value);
  } else {
    let temp = [];
    bookList.value.forEach((item) => {
      if (item.title.includes(value.value) || item.ISBN.includes(value.value)) {
        temp.push(item);
      }
    });
    bookList.value = temp;
  }
};
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
