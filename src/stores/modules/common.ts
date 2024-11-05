import { defineStore } from "pinia";
type pageType = "home" | "my";
type stateType = {
  showPage: pageType;
};
export const usecommonStore = defineStore("common", {
  state: (): stateType => ({
    showPage: "home",
  }),
  actions: {
    setPage(page: pageType) {
      this.showPage = page;
    },
    getPage() {
      return this.showPage;
    },
  },
});
