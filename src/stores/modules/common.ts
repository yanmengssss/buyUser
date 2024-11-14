import { defineStore } from "pinia";
type pageType = "home" | "my";
type stateType = {
  showPage: pageType;
  type: "" | "add" | "back";
};
export const usecommonStore = defineStore("common", {
  state: (): stateType => ({
    showPage: "home",
    type: "",
  }),
  actions: {
    setPage(page: pageType) {
      this.showPage = page;
    },
    setType(type: "" | "add" | "back") {
      this.type = type;
    },
    getPage() {
      return this.showPage;
    },
    getType() {
      return this.type as "" | "add" | "back";
    },
  },
});
