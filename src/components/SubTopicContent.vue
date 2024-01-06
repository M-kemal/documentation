<template>
  <div class="sub-heading-list">
    <ul v-if="subHeadings">
      <li v-for="subHeading in subHeadings" :key="subHeading">
        <a href="#" @click.prevent="scrollTo(subHeading)">
          {{ subHeading }}***
        </a>
      </li>
    </ul>
    , watch
  </div>
</template>

<script>
import { defineComponent, computed, watch } from "vue";
import { useRoute } from "vue-router";
import topics from "@/data.json";

export default defineComponent({
  setup() {
    const route = useRoute();
    const subHeadings = computed(() => {
      const topicData = topics[route.params.topic];
      return topicData && typeof topicData === "object"
        ? Object.keys(topicData)
        : [];
    });

    const scrollTo = (subHeading) => {
      const elementId = subHeading.toLowerCase().split(" ").join("-");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    watch(route, () => {
      // Route değiştiğinde scroll en üste alınır
      window.scrollTo(0, 0);
    });

    return { subHeadings, scrollTo };
  },
});
</script>

<style>
/* CSS stilinizi buraya ekleyin */
</style>
