<template>
  <div class="ml-5 mkBg hidden lg:block">
    <div class="sub-heading-list text-textColor">
      <ul v-if="subHeadings" class="sticky top-0">
        <h3 class="heading1 !text-xs !text-textColor pt-5 !mt-0 !mb-2">
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
              class="w-1 h-4 bg-mkSecondary mr-1"
              :class="isActive(subHeading) ? 'block' : 'hidden'"
            ></div>
            <span class="text-xs tracking-[.2px] leading-6">{{
              formatKey(subHeading)
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
 
  setup() {
    const route = useRoute();
    const activeSubHeading = ref("");
    const router = useRouter();

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
      // element.scrollIntoView();
      const offset = -24;
      window.scroll({
        top: element.offsetTop + offset,
      });
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

    const formatKey = (key) => {
      if (key === "Current State of Web3 Games and Applications") {
        return "Web3 Games Overview";
      } else if (key === "Analysis of the Fragmented Structure") {
        return "Market Fragmentation";
      } else if (key === "Brand Awareness and Communication Strategies") {
        return "Brand & Communication";
      } else if (key === "Target Audience Analysis and Customized Campaigns") {
        return "Audience & Campaigns";
      } else if (key === "Community Creation and Social Media Activity") {
        return "Social Media Engagement";
      } else if (key === "Community Creation and Management") {
        return "Community Management";
      } else if (key === "Usage in Web3, DeFi, and Game Projects") {
        return "Web3 & DeFi Usage";
      } else if (key === "Low Transaction Fees and Fast Confirmations") {
        return "Efficient Transactions";
      } else if (key === "Community-Centric Approach and Governance") {
        return "Community Governance";
      } else if (
        key === "Integration with Small Businesses and Local Markets"
      ) {
        return "Local Market Integration";
      } else if (
        key === "Artificial Intelligence and Machine Learning Integration"
      ) {
        return "AI & ML Integration";
      } else if (key === "Automatic Payments with Smart Contracts") {
        return "Smart Payments";
      } else if (key === "Global Expansion and Multilingual Support") {
        return "Global Expansion";
      }

      return key.replace(/([A-Z])/g, " $1").trim();
    };

    return { subHeadings, setActive, isActive, formatKey };
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
  ); 
}
</style>
