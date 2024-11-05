import { defineStore } from "pinia";
import { ref } from "vue";
export const useTimerStore = defineStore(
  "timer",
  () => {
    const timer = ref(
      localStorage.getItem("time") ? localStorage.getItem("time") : 30
    );
    // 30
    const status = ref(false); //表示没有启动
    const T = ref(null);
    const setstatus = (val) => {
      status.value = val;
      if (val)
        T.value = setInterval(() => {
          localStorage.setItem("time", timer.value);
          timer.value--;
          if (timer.value == 0) {
            clearInterval(T.value);
            setstatus(false);
            timer.value = 30;
            localStorage.removeItem("time");
          }
        }, 1000);
    };

    return {
      timer,
      status,
      setstatus,
    };
  },
  {
    persist: true,
  }
);
