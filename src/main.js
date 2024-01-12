import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/main.css";
import ClickOutside from "@/directives/ClickOutside";
import { MotionPlugin } from "@vueuse/motion";

const app = createApp(App);
app.use(router);
app.directive("click-outside", ClickOutside);
app.use(MotionPlugin);
app.mount("#app");
