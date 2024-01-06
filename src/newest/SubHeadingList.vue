<!-- <template>
  <div class="ml-8 bg-mkBg hidden lg:block">
    <div class="sub-heading-list text-textColor">
      <ul v-if="subHeadings" class="sticky top-0">
        <h3 class="heading1 !text-sm !text-textColor pt-5 !mt-0 !mb-2">
          ON THIS PAGE
        </h3>
        <li
          v-for="subHeading in subHeadings"
          :key="subHeading"
          class="flex items-center"
        >
          <a
            href="#"
            :class="{ active: isActive(subHeading) }"
            @click.prevent="setActive(subHeading)"
            class="flex items-center"
          >
            <div
              class="w-1 h-4 bg-[#42b883] mr-2"
              :class="isActive(subHeading) ? 'block' : 'hidden'"
            ></div>
            <span class="text-xs font-medium tracking-[.6px] leading-6">{{
              subHeading
            }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import topics from "@/data.json";

export default defineComponent({
  setup() {
    const route = useRoute();
    const activeSubHeading = ref("");

    const subHeadings = computed(() => {
      const topicData = topics[route.params.topic];
      return topicData && typeof topicData === "object"
        ? Object.keys(topicData)
        : [];
    });

    const checkActiveSubHeading = () => {
      let closestHeading = "";
      let closestHeadingDistance = Infinity;

      for (const subHeading of subHeadings.value) {
        const formattedId = subHeading.toLowerCase().split(" ").join("-");
        const element = document.getElementById(formattedId);
        if (element) {
          const distance = Math.abs(element.getBoundingClientRect().top);
          if (distance < closestHeadingDistance) {
            closestHeadingDistance = distance;
            closestHeading = subHeading;
          }
        }
      }

      activeSubHeading.value = closestHeading;
    };

    onMounted(() => {
      window.addEventListener("scroll", checkActiveSubHeading);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", checkActiveSubHeading);
    });

    const setActive = (subHeading) => {
      activeSubHeading.value = subHeading;
      scrollTo(subHeading);
    };

    const scrollTo = (subHeading) => {
      const formattedId = subHeading.toLowerCase().split(" ").join("-");
      const element = document.getElementById(formattedId);
      if (element) {
        element.scrollIntoView();
      }
    };

    const isActive = (subHeading) => {
      return subHeading === activeSubHeading.value;
    };

    return { subHeadings, setActive, isActive };
  },
});
</script>

<style>
.active {
  /* Aktif link için stil */
  color: rgba(
    255,
    255,
    255,
    0.87
  ); /* Örnek stil, ihtiyaca göre değiştirilebilir */
}
</style> -->

<template>
  <div class="ml-8 mkBg hidden lg:block">
    <div class="sub-heading-list text-textColor">
      <ul v-if="subHeadings" class="sticky top-0">
        <h3 class="heading1 !text-sm !text-textColor pt-5 !mt-0 !mb-2">
          ON THIS PAGE
        </h3>
        <li
          v-for="subHeading in subHeadings"
          :key="subHeading"
          class="flex items-center"
        >
          <a
            href="#"
            :class="{ active: isActive(subHeading) }"
            @click.prevent="setActive(subHeading)"
            class="flex items-center"
          >
            <div
              class="w-1 h-4 bg-[#42b883] mr-2"
              :class="isActive(subHeading) ? 'block' : 'hidden'"
            ></div>
            <span class="text-xs font-medium tracking-[.6px] leading-6">{{
              subHeading
            }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import topics from "@/data.json";

export default defineComponent({
  // props: {
  //   topics: {
  //     type: Object,
  //   },
  // },
  setup() {
    const route = useRoute();
    const activeSubHeading = ref("");
    const router = useRouter();

    // const subHeadings = computed(() => {
    //   const topicData = props.topics[route.params.topic];
    //   return topicData && typeof topicData === "object"
    //     ? Object.keys(topicData)
    //     : [];
    // });

    // ...

    const subHeadings = computed(() => {
      if (route.params.topic) {
        const topicData = topics[route.params.topic];
        return topicData && typeof topicData === "object"
          ? Object.keys(topicData)
          : [];
      } else {
        // Eğer route.params.topic mevcut değilse, tüm başlıkları döndür
        const allSubHeadings = [];
        for (const topic in topics) {
          const topicData = topics[topic];
          if (typeof topicData === "object") {
            allSubHeadings.push(...Object.keys(topicData));
          }
        }
        return allSubHeadings;
      }
    });

    // ...

    const checkActiveSubHeading = () => {
      let closestHeading = "";
      let closestHeadingDistance = Infinity;

      for (const subHeading of subHeadings.value) {
        const formattedId = subHeading.toLowerCase().split(" ").join("-");
        const element = document.getElementById(formattedId);
        if (element) {
          const distance = Math.abs(element.getBoundingClientRect().top);
          if (distance < closestHeadingDistance) {
            closestHeadingDistance = distance;
            closestHeading = subHeading;
          }
        }
      }

      activeSubHeading.value = closestHeading;
    };

    onMounted(() => {
      window.addEventListener("scroll", checkActiveSubHeading);
      if (route.query.subHeading) {
        scrollTo(route.query.subHeading);
      }
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", checkActiveSubHeading);
    });

    // const setActive = (subHeading) => {
    //   activeSubHeading.value = subHeading;
    //   scrollTo(subHeading);
    //   const topic = route.params.topic;
    //   router.push({
    //     name: "Topic",
    //     params: { topic: topic },
    //     query: { subHeading: subHeading.toLowerCase().split(" ").join("-") },
    //   });
    // };

    const setActive = (subHeading) => {
      activeSubHeading.value = subHeading;
      scrollTo(subHeading);
      if (route.params.topic) {
        const topic = route.params.topic;
        router.push({
          name: "Topic",
          params: { topic: topic },
          query: { subHeading: subHeading.toLowerCase().split(" ").join("-") },
        });
      }
    };

    const scrollTo = async (subHeading) => {
      const formattedId = subHeading.toLowerCase().split(" ").join("-");

      const findElement = () =>
        new Promise((resolve) => {
          const checkExist = setInterval(() => {
            const element = document.getElementById(formattedId);
            if (element) {
              clearInterval(checkExist);
              resolve(element);
            }
          }, 100);
        });

      const element = await findElement();
      element.scrollIntoView();
    };

    const isActive = (subHeading) => {
      return subHeading === activeSubHeading.value;
    };

    watch(
      () => route.query.subHeading,
      (newSubHeading) => {
        if (newSubHeading) {
          scrollTo(newSubHeading);
        }
      }
    );

    return { subHeadings, setActive, isActive };
  },
});
</script>

<style>
.active {
  /* Aktif link için stil */
  color: rgba(
    255,
    255,
    255,
    0.87
  ); /* Örnek stil, ihtiyaca göre değiştirilebilir */
}
</style>
