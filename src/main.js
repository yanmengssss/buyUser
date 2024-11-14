import { createApp } from "vue";
import { createPinia } from "pinia";
import "vant/lib/index.css";
import App from "./App.vue";
import router from "./router";
import { Tabbar, TabbarItem, NavBar, Search, Image, Dialog, Icon } from "vant";
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
[Tabbar, TabbarItem, NavBar, Search, Image, Dialog, Icon].forEach((item) =>
  app.use(item)
);
