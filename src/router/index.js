import { createRouter, createWebHashHistory } from "vue-router";
import TopicContent from "../components/TopicContent.vue";
import HomeView from "../views/HomeView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "WERK1000X" },
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
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "WERK1000X-WhitePaper";
  next();
});
export default router;
