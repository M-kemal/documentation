<template>
  <div id="app">
    <div
      class="fixed top-0 left-0 z-40 w-[272px] h-screen transition-transform -translate-x-full sm:translate-x-0 duration-300 ease-linear mobileBg"
      :class="{ 'translate-x-0  h-full  ': isOpen }"
    >
      <button
        v-if="isOpen"
        @click="showSideBar"
        type="button"
        class="toggle-outside inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-100 rounded-lg sm:hidden hover:bg-textColor bg-mkSecondary focus:outline-none focus:ring-2 absolute top-0 right-2 z-50"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close sidebar</span>
      </button>
      <SidebarApp />
    </div>
    <div class="content">
      <button
        :class="{ 'overflow-hidden': isOpen }"
        @click="showSideBar"
        type="button"
        class="toggle-outside bg-[#1a1a1a] shadow-md flex items-center p-2 mt-4 text-center mx-auto text-sm text-gray-100 rounded-lg sm:hidden hover:bg-textColor focus:outline-none focus:ring-2"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="#f89844"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <router-view :topics="topicData" />
    </div>
    <div
      class="fixed top-0 right-0 z-50 w-64 h-screen hidden md:block overflow-y-scroll pb-20"
    >
      <SubHeadingList />
    </div>
  </div>
</template>

<script>
import { provide, ref } from "vue";
import SidebarApp from "./components/SidebarApp.vue";
import SubHeadingList from "./components/SubHeadingList.vue";
import topics from "@/data.json";

export default {
  components: {
    SidebarApp,
    SubHeadingList,
  },
  setup() {
    const isOpen = ref(false);

    const showSideBar = () => {
      isOpen.value = !isOpen.value;
    };

    const closeSidebar = () => {
      isOpen.value = false;
    };

    const topicData = ref(topics);

    provide("closeSidebar", closeSidebar);
    provide("isOpen", isOpen);
    // provide("showSideBar", showSideBar);

    return { showSideBar, isOpen, topicData };
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}


a.router-link-exact-active {
  color: #f89844;
}
a.router-link-exact-active:hover {
  color: #f89844;
}

.blurBg {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  /* background: linear-gradient(#0b2142, #14558e); */
  filter: blur(1.5px);
}

@media screen and (max-width: 800px) {
  .mobileBg {
    background-color: #0e0e0e;
  }
}

@media screen and (max-width: 450px) {
  .content {
    width: 100%;
  }
}
</style>
