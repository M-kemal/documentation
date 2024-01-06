<template>
  <div class="sidebar-menu w-1/3 bg-emerald-400">
    <ul class="sticky top-3">
      <li v-for="page in pages" :key="page.path">
        <!-- <router-link :to="page.path">{{ page.title }}</router-link> -->
        <router-link :to="page.path">{{ page.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import pageData from "@/pages.json"; // Sayfa verilerinizi burada tanımlayın

export default {
  name: "SidebarMenu",
  data() {
    return {
      pages: pageData,
    };
  },
};
</script>

<style>
/* SidebarMenu stil tanımlamalarınız */
.sidebar-menu {
  /* Stil ayarları */
}
</style>
