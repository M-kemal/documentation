<!-- <template>
  <div class="content lg:p-4 sm:ml-64 lg:mr-64 border-r border-r-cardColor">
    <h1
      class="text-center text-3xl sm:text-5xl font-header font-semibold text-[#42b883] border-b border-b-cardColor contentbg py-4"
    >
      {{ topic }}
    </h1>
    <div v-if="isObject(content)" class="pb-96 px-10">
      <section v-for="(subContent, subKey) in content" :key="subKey" class="">
        <h2 :id="formatId(subKey)" class="heading1 !text-text !mb-4">
          {{ subKey }}
        </h2>
        <div v-if="isObject(subContent)">
          <div v-for="(desc, key) in subContent" :key="key">
            <h3 class="heading3 !mb-2 !text-emerald-500">{{ key }}</h3>
            <p class="text-text">{{ desc }}</p>
          </div>
        </div>
        <p v-else class="text-text">{{ subContent }}</p>
      </section>
    </div>
    <p v-else>{{ content }}</p>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import topics from "@/data.json";

export default defineComponent({
  setup() {
    const route = useRoute();
    const topic = computed(() => route.params.topic);
    const content = computed(() => topics[topic.value]);
    const isObject = (value) => typeof value === "object" && value !== null;

    const scrollToHash = () => {
      const hash = route.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView();
        }
      }
    };

    onMounted(() => {
      scrollToHash();
    });

    const formatId = (key) => key.toLowerCase().split(" ").join("-");

    return { topic, content, isObject, formatId };
  },
});
</script>

<style>
/* CSS stilinizi buraya ekleyin */
.contentbg {
  background: url("../assets/content.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style> -->

<template>
  <div
    class="content lg:p-4 sm:ml-64 lg:mr-64 border-r border-r-cardColorİptal border-r-titleBackground"
  >
    <h1
      class="text-center text-3xl sm:text-5xl font-header font-semibold text-[#42b883] border-b border-b-cardColorİptal border-b-titleBackground contentbg py-4"
    >
      {{ topic }}
    </h1>
    <div v-if="isObject(content)" class="pb-96 px-10">
      <section v-for="(subContent, subKey) in content" :key="subKey" class="">
        <h2 :id="formatId(subKey)" class="heading1 !text-text !mb-4">
          {{ subKey }}
        </h2>
        <div v-if="isObject(subContent)">
          <div v-for="(desc, key) in subContent" :key="key">
            <h3 class="heading3 !mb-2 !text-emerald-500">{{ key }}</h3>
            <p class="text-text">{{ desc }}</p>
          </div>
        </div>
        <p v-else class="text-text">{{ subContent }}</p>
      </section>
    </div>
    <p v-else>{{ content }}</p>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
// import topics from "@/data.json";

export default defineComponent({
  props: {
    topics: {
      type: Object,
    },
  },
  setup(props) {
    const route = useRoute();
    const topic = computed(() => route.params.topic);
    const content = computed(() => props.topics[topic.value]);
    const isObject = (value) => typeof value === "object" && value !== null;

    const formatId = (key) => key.toLowerCase().split(" ").join("-");

    return { topic, content, isObject, formatId };
  },
});
</script>

<style>
/* CSS stilinizi buraya ekleyin */
.contentbg {
  background: url("../assets/content.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
