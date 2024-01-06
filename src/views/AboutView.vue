<template>
  <div
    class="content lg:p-4 sm:ml-72 lg:mr-64 border-r border-r-zinc-500 transition-all duration-300 ease-linear !pb-96 text-white"
    :class="{ 'blurBg': isOpen }"
  >
    <div
      v-for="(mainSection, mainKey) in topics"
      :key="mainKey"
      :id="formatId(mainKey)"
      class="px-10"
    >
      <h2 class="!text-pink-500 heading1 !text-center">{{ mainKey }}</h2>
      <template v-if="isObject(mainSection)">
        <div
          v-for="(subSection, subKey) in mainSection"
          :key="subKey"
          :id="formatId(subKey)"
        >
          <h3 class="!text-blue-500 heading2 !mb-1 !mt-8">{{ subKey }}</h3>
          <template v-if="isObject(subSection)">
            <div
              v-for="(innerSection, innerKey) in subSection"
              :key="innerKey"
              :id="formatId(innerKey)"
            >
              <h4 class="!text-yellow-500 heading3 !mb-1">{{ innerKey }}</h4>
              <p v-if="!isObject(innerSection)">{{ innerSection }}</p>
              <template v-if="isObject(innerSection)">
                <div
                  v-for="(deepSection, deepKey) in innerSection"
                  :key="deepKey"
                  :id="formatId(deepKey)"
                >
                  <h5>{{ deepKey }}</h5>
                  <p>{{ deepSection }}</p>
                </div>
              </template>
            </div>
          </template>
          <p v-else>{{ subSection }}</p>
        </div>
      </template>
      <p v-else>{{ mainSection }}</p>
    </div>
  </div>
</template>

<script>
import { inject, reactive, ref, watchEffect } from "vue";
import topics from "@/data.json";

export default {
  setup() {
    const reactiveData = reactive(topics);
    const subHeadings = ref([]);
    const isObject = (item) => {
      return item && typeof item === "object" && !Array.isArray(item);
    };
    const formatId = (key) => key.toLowerCase().split(" ").join("-");
    watchEffect(() => {
      subHeadings.value = extractSubHeadings(reactiveData);
    });
    function extractSubHeadings(topics) {
      let headings = [];
      Object.keys(topics).forEach((mainKey) => {
        if (isObject(topics[mainKey])) {
          Object.keys(topics[mainKey]).forEach((subKey) => {
            headings.push(subKey);
          });
        }
      });
      return headings;
    }

    const isOpen = inject("isOpen");

    return {
      topics: reactiveData,
      subHeadings,
      isObject,
      formatId,
      isOpen,
    };
  },
};
</script>
