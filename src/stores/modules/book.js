import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const usebookstore = defineStore(
  "book",
  () => {
    const bookIBSN = ref("");
    const setbookIBSN = (newbookId) => {
      bookIBSN.value = newbookId;
    };
    const getbookIBSN = computed(() => bookIBSN.value);
    return {
      bookIBSN,
      setbookIBSN,
      getbookIBSN,
    };
  },
  {
    persist: true,
  }
);
