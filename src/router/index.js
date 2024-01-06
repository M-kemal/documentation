import { createRouter, createWebHistory } from "vue-router";
import TopicContent from "../newest/TopicContent.vue";
import SubTopicContent from "../newest/SubTopicContent.vue";
import AboutView from "../views/AboutView.vue";
const routes = [
  // {
  //   path: "/",
  //   redirect: "/topic/Blockchain", // Burada 'ilk-konu', JSON dosyanızda tanımlı bir ana başlık olmalıdır.
  // },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  { path: "/topic/:topic", component: TopicContent, name: "Topic" },
  {
    path: "/topic/:topic/:subTopic",
    component: SubTopicContent,
    name: "SubTopic",
  },
  // {
  //   path: "/topic/:topic/:subHeading?",
  //   component: TopicContent,
  //   name: "TopicWithSubHeading",
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  // scrollBehavior(to, from, savedPosition) {
  //   // Sayfa değiştikten sonra scroll pozisyonunu kontrol et
  //   if (savedPosition) {
  //     // Eğer bir önceki sayfadan geliyorsa, kaydedilen pozisyonu kullan
  //     return savedPosition;
  //   } else {
  //     // Aksi halde scroll pozisyonunu en üstte konumla
  //     return { top: 0 };
  //   }
  // },
});

export default router;
