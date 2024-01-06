<template>
  <div class="right-sidebar w-2/6 mx-auto text-center bg-pink-400 text-sm">
    <ul class="sticky top-0 p-4 space-y-2 w-full">
      <li class="uppercase text-xs">On This Page</li>
      <li v-for="header in formattedHeaders" :key="header.id">
        <a
          href="#"
          @click="scrollToHeader(header, $event)"
          :class="{ active: header.id === globalState.activeHeaderId }"
        >
          <p class="text-start flex items-center relative">
            <span
              v-if="header.id === globalState.activeHeaderId"
              class="w-1 h-full bg-green-400 absolute top-0 -left-2"
            >
            </span>
            <span>
              {{ header.text }}
            </span>
          </p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { globalState } from "@/state";
import { computed, onMounted } from "vue";

export default {
  name: "RightSidebar",
  setup() {
    // const scrollToHeader = (header, event) => {
    //   event.preventDefault();
    //   globalState.activeHeaderId = header.id;
    //   const element = document.getElementById(header.id);
    //   // if (element) {
    //   //   element.scrollIntoView({ behavior: "smooth" });
    //   // }
    //   element.scrollIntoView();
    // };

    const scrollToHeader = (header, event) => {
      event.preventDefault();
      globalState.activeHeaderId = header.id;
      const element = document.getElementById(header.id);
      if (element) {
        element.scrollIntoView();
      }
    };

    const checkActiveHeader = () => {
      let currentActiveId = null;
      globalState.headers.forEach((header) => {
        const element = document.getElementById(header.id);
        if (
          element &&
          element.getBoundingClientRect().top < window.innerHeight / 2
        ) {
          currentActiveId = header.id;
        }
      });
      globalState.activeHeaderId = currentActiveId;
      console.log(globalState.activeHeaderId);
    };

    onMounted(() => window.addEventListener("scroll", checkActiveHeader));

    // const formattedHeaders = computed(() => {
    //   return globalState.headers.map((header) => {
    //     // Eğer header.text tanımlı değilse, varsayılan bir metin kullan
    //     let text = header.text || "Default Text";
    //     if (text.length > 24) {
    //       text = text.substring(0, 24) + "...";
    //     }
    //     return { ...header, text };
    //   });
    // });

    const formattedHeaders = computed(() => {
      return globalState.headers
        .filter((header) => header.text && header.text.trim().length > 0)
        .map((header) => {
          let text = header.text;
          if (text.length > 24) {
            text = text.substring(0, 24) + "...";
          }
          return { ...header, text };
        });
    });

    return {
      scrollToHeader,
      globalState,
      formattedHeaders,
    };
  },
};
</script>

<style>
.active {
  font-weight: bold;
  color: #fff;
}
/* Diğer stil tanımlamalarınız */
</style>
