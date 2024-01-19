<template>
  <div class="lg:border-r lg:border-r-zinc-500/25 h-full mobileBg">
    <div class="h-full px-3 py-4 overflow-y-auto overflow-x-hidden mkBg">
      <div
        class="w-full mx-auto py-8 border-b border-b-cardColorİptal border-b-titleBackground flex items-center flex-col cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-16 h-16 text-white p-2 bg-mkSecondary rounded-full"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
        </svg>
        <h1 class="mt-4 text-xl font-body font-semibold flex items-center">
          <span
            class="bg-clip-text !text-transparent bg-gradient-to-r from-mkSecondary to-white"
            >Werk 1000X</span
          >
        </h1>
      </div>
      <!-- <div
        class="text-text mb-2 text-sm font-medium text-start pl-8 mt-4 w-full border-b pb-4 border-b-cardColorİptal border-b-titleBackground"
      >
        Main Headings
      </div> -->
      <ul
        class="mt-4 flex flex-col items-start tracking-[.4px] w-full mx-2 leading-5 text-textColor pb-32"
      >
        <li class="w-full">
          <router-link
            class="w-full flex items-center font-medium text-sm hover:text-text transition-colors duration-300 pb-2"
            @click="handleLinkClick"
            to="/"
            v-slot="{ isActive }"
          >
            <span class="">
              <svg
                v-show="!isActive"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                class="bi bi-circle mr-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.987 16a1.526 1.526 0 0 1-1.07-.448L.45 9.082a1.531 1.531 0 0 1 0-2.165L6.917.45a1.531 1.531 0 0 1 2.166 0l6.469 6.468A1.526 1.526 0 0 1 16 8.013a1.526 1.526 0 0 1-.448 1.07l-6.47 6.469A1.526 1.526 0 0 1 7.988 16zM7.639 1.17 4.766 4.044 8 7.278l3.234-3.234L8.361 1.17a.51.51 0 0 0-.722 0zM8.722 8l3.234 3.234 2.873-2.873c.2-.2.2-.523 0-.722l-2.873-2.873zM8 8.722l-3.234 3.234 2.873 2.873c.2.2.523.2.722 0l2.873-2.873zM7.278 8 4.044 4.766 1.17 7.639a.511.511 0 0 0 0 .722l2.874 2.873z"
                />
              </svg>
              <svg
                v-show="isActive"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="#FFF"
                class="bi bi-circle-fill mr-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.614L8 8.708l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.614-.706L7.292 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098l2.904 2.905z"
                />
              </svg>
            </span>
            <span> All </span>
          </router-link>
        </li>
        <li v-for="(content, title) in topics" :key="title" class="w-full">
          <router-link
            :to="{ name: 'Topic', params: { topic: title } }"
            class="w-full flex items-center text-sm font-semibold hover:text-text transition-colors duration-300 pb-2"
            @click="handleLinkClick"
            v-slot="{ isActive }"
          >
            <span class="">
              <svg
                v-show="!isActive"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                class="bi bi-circle mr-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.987 16a1.526 1.526 0 0 1-1.07-.448L.45 9.082a1.531 1.531 0 0 1 0-2.165L6.917.45a1.531 1.531 0 0 1 2.166 0l6.469 6.468A1.526 1.526 0 0 1 16 8.013a1.526 1.526 0 0 1-.448 1.07l-6.47 6.469A1.526 1.526 0 0 1 7.988 16zM7.639 1.17 4.766 4.044 8 7.278l3.234-3.234L8.361 1.17a.51.51 0 0 0-.722 0zM8.722 8l3.234 3.234 2.873-2.873c.2-.2.2-.523 0-.722l-2.873-2.873zM8 8.722l-3.234 3.234 2.873 2.873c.2.2.523.2.722 0l2.873-2.873zM7.278 8 4.044 4.766 1.17 7.639a.511.511 0 0 0 0 .722l2.874 2.873z"
                />
              </svg>
              <svg
                v-show="isActive"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="#FFF"
                class="bi bi-circle-fill mr-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.614L8 8.708l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.614-.706L7.292 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098l2.904 2.905z"
                />
              </svg>
            </span>
            <span>
              {{ formatKey(title) }}
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, onBeforeUnmount, onMounted } from "vue";
import topics from "@/data.json";
import pages from "@/pages.json";

export default defineComponent({
  setup() {
    const closeSidebar = inject("closeSidebar");

    const onLinkClick = () => {
      if (closeSidebar) {
        closeSidebar();
      }
    };

    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    const handleLinkClick = () => {
      onLinkClick();
      scrollToTop();
    };

    const onClickOutside = (event) => {
      const isToggleButton = event.target.closest(".toggle-outside");
      if (!isToggleButton) {
        onLinkClick();
      }
    };

    onMounted(() => {
      document.addEventListener("click", onClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", onClickOutside);
    });

    // const formatKey = (key) => key.replace(/([A-Z])/g, " $1").trim();

    const formatKey = (key) => {
      // Özel başlık isimlerini kontrol et
      if (key === "Token Economics, Distribution, and Staking Policy") {
        return "Tokenomics & Staking";
      } else if (key === "Industry Analysis and Opportunities") {
        return "Market Insights";
      } else if (key === "Technical Specifications and Infrastructure") {
        return "Tech Specs";
      } else if (key === "Business Partnerships and Collaborations") {
        return "Partnerships";
      } else if (key === "Sustainability and Innovation") {
        return "Sustainable Innovation";
      } else if (key === "Daily Use and Innovation") {
        return "Daily Innovation";
      } else if (key === "Marketing and Community Management") {
        return "Marketing & Community";
      } else if (key === "Map and Future Plans") {
        return "Roadmap";
      }

      // Eğer özel bir isim yoksa, genel formatlama yap
      return key.replace(/([A-Z])/g, " $1").trim();
    };

    return { topics, pages, handleLinkClick, formatKey };
  },
});
</script>

<style>
.no-hover:hover {
  color: inherit; /* Hover durumunda renk değişikliği yapma */
}

/* .contentbg {
  background: url("../assets/content.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
} */
</style>
