import { createRouter, createWebHashHistory } from "vue-router";
import TopicContent from "../components/TopicContent.vue";
import HomeView from "../views/HomeView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/documentation/",
    redirect: "/",
  },
  { path: "/topic/:topic", component: TopicContent, name: "Topic" },
 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
