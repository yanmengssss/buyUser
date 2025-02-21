<template>
  <div style="width: 100vw; height: 100vh; overflow: hidden">
    <van-nav-bar
      title="我的信息"
      style="background-color: rgba(0, 0, 0, 0.1)"
    />
    <div class="mes">
      <div class="info">
        <van-image
          width="100"
          height="100"
          round
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <div class="text">
          <h2>Ye</h2>
          <div class="account">1657294032</div>
        </div>
      </div>
    </div>
    <el-card
      style="max-width: 95%; margin: 0.3125rem auto"
      @click="router.push('/history')"
      >购买历史</el-card
    >
    <el-card
      style="max-width: 95%; margin: 0.3125rem auto"
      @click="toScan('back')"
      >购买商品</el-card
    >
    <el-card
      style="max-width: 95%; margin: 0.3125rem auto"
      @click="toScan('add')"
      >商品录入</el-card
    >
    <el-card style="max-width: 95%; margin: 0.3125rem auto" @click="logOut"
      >退出登录</el-card
    >
  </div>
  <Dialogs :show="show" :title="'详情'" :confirm="onconfirm" :cancel="onclose">
    <template #default>
      <div style="width: 100%; text-align: center">
        <el-input
          v-for="item in inputList"
          :key="item.type"
          v-model="inputState[item.type]"
          style="width: 240px; margin-top: 5px"
          :placeholder="item.lable"
        />
        <el-select
          v-model="inputState.type"
          placeholder="请选择类型"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in booktype"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
      </div>
    </template>
  </Dialogs>
</template>
<script setup lang="ts">
import router from "@/router";
import { watch, ref, reactive, onMounted } from "vue";
import { usebookstore } from "@/stores";
import { getBookDetail, addBook } from "@/apis/api";
import { usecommonStore } from "@/stores/modules/common";
import Dialogs from "@/components/Dialogs.vue";
const bookstore = usebookstore();
const type = ref<"" | "back" | "add">("");
const commonStore = usecommonStore();
const show = ref(false);
const onclose = () => {
  show.value = false;
};

const booktype = [
  { label: "零食饮料", key: 0 },
  { label: "冷藏食品", key: 1 },
  { label: "速食热餐", key: 2 },
  { label: "日用品", key: 3 },
  { label: "烟酒类", key: 4 },
  { label: "报刊杂志", key: 5 },
  { label: "宠物食品", key: 6 },
];
const onconfirm = () => {
  addBook({ bookId: inputState.id }).then((res) => {
    if (res.code == "0") {
      ElMessage.success("购买" + inputState.bookName + "成功");
      show.value = false;
    } else {
      ElMessage.success("购买" + inputState.bookName + "失败");
    }
  });
};
const inputList = [
  {
    lable: "请输入名称",
    type: "bookName",
  },
  {
    lable: "请输入品牌",
    type: "publish",
  },
  {
    lable: "请输入商品码",
    type: "isbn",
  },
  {
    lable: "请输入出版商",
    type: "author",
  },
  // {
  //   lable: "请输入简介",
  //   type: "introduce",
  // },
  // {
  //   lable: "请输入位置",
  //   type: "location",
  // },
  // {
  //   lable: "请输入权重",
  //   type: "hot",
  // },
];
let inputState = reactive({
  bookName: "",
  publish: "",
  type: 0,
  location: "",
  introduce: "",
  isbn: "",
  author: "",
  hot: 0,
});
onMounted(() => {
  // getBookDetail("978-3-16-148410-0").then((res) => {
  //   if (res.code == 100) {
  //     ElMessage.error("查无此物");
  //   } else {
  //     inputState.bookName = res.detail.name;
  //     inputState.publish = res.detail.publisher;
  //     inputState.author = res.detail.author;
  //     inputState.isbn = res.detail.isbn;
  //     inputState.introduce = res.detail.introduce;
  //     show.value = true;
  //   }
  // });
  // // 重置状态
  // bookstore.setbookIBSN(""); // 清空bookstore中的bookIBSN
});
const logOut = () => {
  localStorage.clear();
  router.push("/login");
};
const toScan = (t: "back" | "add") => {
  commonStore.setType(t);
  router.push("/scanPage");
};
const changeVal = (val, e) => {
  inputState[val] = e;
  console.log(inputState);
};
watch(
  [() => bookstore.getbookIBSN],
  ([newVal]) => {
    if (newVal != "") {
      if (commonStore.getType() == "back") {
        ElMessage.success("购买" + newVal);
      } else if (commonStore.getType() == "add") {
        getBookDetail(newVal).then((res) => {
          if (!res.code || res.code == 100) {
            ElMessage.error("查无此物");
          } else {
            // inputState.bookName = res.detail.name;
            inputState.publish = res.detail.publisher;
            inputState.author = res.detail.author;
            inputState.isbn = res.detail.isbn;
            inputState.introduce = res.detail.introduce;

            show.value = true;
          }
        });
        // 在这里可以处理getBookDetail的返回值res
      }
      // 重置状态
      bookstore.setbookIBSN(""); // 清空bookstore中的bookIBSN
    }
  },
  {
    immediate: true,
  }
);
</script>
<style scoped lang="less">
.mes {
  padding-top: 20px;
  background-image: url("@/assets/bg.jpg");
  background-size: cover; /* 让背景图铺满 */
  background-position: center; /* 使背景图居中 */
  background-repeat: no-repeat;
  height: 11.25rem;
  display: flex;
  align-items: end;
  padding-bottom: 20px;
  justify-content: space-between;
  .info {
    width: fit-content;
    margin-left: 10%;
    display: flex;
    height: 100px;
    .text {
      margin-top: 20px;
      margin-left: 20px;
      height: 5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h2 {
        margin: 0;
      }
      .account {
        margin-top: 10px;
        font-size: medium;
        font-weight: 500;
      }
    }
  }
}
.choose {
  padding-top: 30px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
