<template>
  <div class="content max-w-3xl bg-slate-900 text-white pt-12">
    <h1 class="heading1 mx-auto !text-center">More Info Whitepaper</h1>
    <img src="../assets/logo.png" alt="" class="mx-auto" />
    <div class="gradientLine"></div>
    <h1
      id="section1"
      v-if="globalState.currentPage.subtitle"
      class="heading1 p-4"
    >
      {{ globalState.currentPage.subtitle }}
    </h1>
    <p v-if="globalState.currentPage.content" class="p-6">
      {{ globalState.currentPage.content }}
    </p>
    <div class="gradientLine"></div>
    <!-- Sayfa içeriğine göre diğer başlıklar veya içerikler -->
    <h1
      id="section2"
      class="heading1 p-4"
      v-if="globalState.currentPage.title2"
    >
      {{ globalState.currentPage.title2 }}
    </h1>
    <p v-if="globalState.currentPage.content2" class="p-6">
      {{ globalState.currentPage.content2 }}
    </p>
    <h1
      id="section3"
      class="heading1 p-4"
      v-if="globalState.currentPage.title3"
    >
      {{ globalState.currentPage.title3 }}
    </h1>
    <p v-if="globalState.currentPage.content3" class="p-6">
      {{ globalState.currentPage.content3 }}
    </p>
    <h1
      id="section4"
      class="heading1 p-4"
      v-if="globalState.currentPage.title4"
    >
      {{ globalState.currentPage.title4 }}
    </h1>
    <p v-if="globalState.currentPage.content4" class="p-6">
      {{ globalState.currentPage.content4 }}
    </p>
    <h1
      id="section5"
      class="heading1 p-4"
      v-if="globalState.currentPage.title5"
    >
      {{ globalState.currentPage.title5 }}
    </h1>
    <p v-if="globalState.currentPage.content5" class="p-6">
      {{ globalState.currentPage.content5 }}
    </p>
  </div>
</template>

<script>
import { globalState } from "@/state";
import { watch } from "vue";
import { useRoute } from "vue-router";
import pageData from "../pages.json";

export default {
  name: "DynamicContent",
  setup() {
    const route = useRoute();

    const updateContentAndHeaders = () => {
      globalState.currentPage =
        pageData.find((p) => p.path === route.path) || {};

      globalState.headers = globalState.currentPage
        ? extractHeadersFromPage(globalState.currentPage)
        : [];
    };

    watch(route, updateContentAndHeaders, { immediate: true });

    function extractHeadersFromPage() {
      // Örnek: page.content'ten başlık bilgilerini çıkarın
      return [
        // Örnek başlıklar
        { id: "section1", text: globalState.currentPage.subtitle },
        { id: "section2", text: globalState.currentPage.title2 },
        { id: "section3", text: globalState.currentPage.title3 },
        { id: "section4", text: globalState.currentPage.title4 },
        { id: "section5", text: globalState.currentPage.title5 },
        // Diğer başlıklar
      ];
    }

    // function extractHeadersFromPage() {
    //   const headers = [];
    //   for (const key in globalState.currentPage) {
    //     if (key.startsWith("title")) {
    //       headers.push({ id: key, text: globalState.currentPage[key] });
    //     }
    //   }
    //   return headers;
    // }

    return {
      globalState,
    };
  },
};
</script>

<style>
/* Stil tanımlamalarınız */
.content {
  /* Stil ayarları */
}

.ImgBg {
  /* background: url("../assets/mkover.webp"); */
  background: url("./assets/mkover.webp");

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
