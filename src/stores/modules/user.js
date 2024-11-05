import { defineStore } from "pinia";
import { ref } from "vue";

//  token setToken removeToken
export const useTokenStore = defineStore(
  "token",
  () => {
    const accessToken = ref("");
    const setAccessToken = (newToken) => {
      accessToken.value = newToken;
    };
    const removeAccessToken = () => {
      accessToken.value = "";
    };

    return {
      accessToken,
      setAccessToken,
      removeAccessToken,
    };
  },
  {
    persist: true,
  }
);
