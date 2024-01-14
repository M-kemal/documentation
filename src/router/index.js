import { createRouter, createWebHashHistory } from "vue-router";
import TopicContent from "../components/TopicContent.vue";
import SubTopicContent from "../components/SubTopicContent.vue";
import HomeView from "../views/HomeView.vue";
// import AboutView from "../views/AboutView.vue";
const routes = [
  // {
  //   path: "/",
  //   redirect: "/topic/Blockchain", // Burada 'ilk-konu', JSON dosyanızda tanımlı bir ana başlık olmalıdır.
  // },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/documentation/",
    redirect: "/",
  },
  // {
  //   path: "/",
  //   name: "about",
  //   component: AboutView,
  //   redirect: "/home",
  // },
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
  history: createWebHashHistory(),
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
