<template>
  <div
    class="content lg:p-4 sm:ml-64 lg:mr-64 border-r border-r-zinc-500/25 transition-all duration-300 ease-linear"
    :class="{ 'blurBg': isOpen }"
  >
    <h1
      class="text-center flex items-center justify-center flex-wrap w-1/2 md:w-10/12 mx-auto !text-2xl lg:!text-5xl font-header font-semibold text-mkSecondary border-b border-b-cardColorİptal border-b-zinc-500/25 contentbg py-4"
    >
      {{ formatKey(topic) }}
    </h1>
    <div v-if="isObject(content)" class="pb-96 px-3 md:px-10">
      <section v-for="(subContent, subKey) in content" :key="subKey" class="">
        <h2 :id="formatId(subKey)" class="heading1 !text-text !mb-4 pt-10 pb-4">
          {{ subKey }}
        </h2>
        <div v-if="isObject(subContent)">
          <div v-for="(desc, key) in subContent" :key="key">
            <h3 class="heading3 !mb-2 !text-emerald-500">{{ key }}</h3>
            <p class="text-text" v-html="desc"></p>
          </div>
        </div>
        <p v-else class="text-text" v-html="subContent"></p>
        <!--! Table1 -->
        <LayoutTable
          :headers="tableHeaders"
          :data="tableData"
          v-if="topic === 'Token Economics, Distribution, and Staking Policy'"
        />
        <!--! Table1 -->
        <!--* PieCard -->
        <PieCard
          v-if="topic === 'Token Economics, Distribution, and Staking Policy'"
        />
        <!--* PieCard -->
        <!--! Table2 -->
        <LayoutTable
          :headers="tableHeaders2"
          :data="tableData2"
          v-if="topic === 'Token Economics, Distribution, and Staking Policy'"
        />
        <!--! Table2 -->
      </section>
    </div>
    <p v-else v-html="content"></p>
  </div>
</template>

<script>
import { defineComponent, computed, inject, ref } from "vue";
import { useRoute } from "vue-router";
// import topics from "@/data.json";
import PieCard from "@/components/PieCard.vue";
import LayoutTable from "./LayoutTable.vue";
import { fadeUpAnimate } from "@/directives/mkAnimate";
export default defineComponent({
  props: {
    topics: {
      type: Object,
    },
  },
  components: {
    PieCard,
    LayoutTable,
  },
  setup(props) {
    const route = useRoute();
    const topic = computed(() => route.params.topic);
    const content = computed(() => props.topics[topic.value]);
    const isObject = (value) => typeof value === "object" && value !== null;

    const formatId = (key) => key.toLowerCase().split(" ").join("-");

    const isOpen = inject("isOpen");

    const formatKey = (key) => key.replace(/([A-Z])/g, " $1").trim();

    //* Data kalın yazma

    // function parseContent(text) {
    //   const regex = /\*\*(.*?)\*\*/g;
    //   let result = "";
    //   let lastIndex = 0;

    //   let match;
    //   while ((match = regex.exec(text)) !== null) {
    //     result += text.slice(lastIndex, match.index);
    //     result += `<strong>${match[1]}</strong>`;
    //     lastIndex = regex.lastIndex;
    //   }
    //   result += text.slice(lastIndex);

    //   return result;
    // }

    // function parseContent(text) {
    //   const regex =
    //     /(\*\*(.*?)\*\*)|(\*(.*?)\*)|(_(.*?)_)|(\{([a-zA-Z]+)\}(.*?)\{\/\8\})/g;
    //   // kalın metin için **metin**, italik için *metin*, ve altı çizili için _metin_
    //   let result = "";
    //   let lastIndex = 0;

    //   let match;
    //   while ((match = regex.exec(text)) !== null) {
    //     result += text.slice(lastIndex, match.index);

    //     if (match[1]) {
    //       // Kalın metin için
    //       result += `<strong>${match[2]}</strong>`;
    //     } else if (match[3]) {
    //       // İtalik metin için
    //       result += `<em>${match[4]}</em>`;
    //     } else if (match[5]) {
    //       // Altı çizili metin için
    //       result += `<u>${match[6]}</u>`;
    //     } else if (match[7]) {
    //       // Renkli metin için
    //       result += `<span style="color:${match[8]}">${match[9]}</span>`;
    //     }

    //     lastIndex = regex.lastIndex;
    //   }

    //   result += text.slice(lastIndex);
    //   return result;
    // }

    // const parsedContent = computed(() => {
    //   if (isObject(content.value)) {
    //     const newContent = {};
    //     for (const key in content.value) {
    //       if (isObject(content.value[key])) {
    //         newContent[key] = {};
    //         for (const subKey in content.value[key]) {
    //           newContent[key][subKey] = parseContent(
    //             content.value[key][subKey]
    //           );
    //         }
    //       } else {
    //         newContent[key] = parseContent(content.value[key]);
    //       }
    //     }
    //     return newContent;
    //   } else {
    //     return parseContent(content.value);
    //   }
    // });

    function parseContent(text) {
      // '?' işaretine göre paragraflara ayır
      return text
        .split("?")
        .map((paragraph) => {
          const regex =
            /(\*\*(.*?)\*\*)|(\*(.*?)\*)|(_(.*?)_)|(\{([a-zA-Z]+)\}(.*?)\{\/\8\})/g;
          let result = "";
          let lastIndex = 0;
          let match;

          while ((match = regex.exec(paragraph)) !== null) {
            result += paragraph.slice(lastIndex, match.index);

            if (match[1]) {
              result += `<strong>${match[2]}</strong>`;
            } else if (match[3]) {
              result += `<em>${match[4]}</em>`;
            } else if (match[5]) {
              result += `<u>${match[6]}</u>`;
            } else if (match[7]) {
              result += `<span style="color:${match[8]}">${match[9]}</span>`;
            }

            lastIndex = regex.lastIndex;
          }

          result += paragraph.slice(lastIndex);
          return `<p class="mt-4">${result.trim()}</p>`;
        })
        .join("");
    }

    const parsedContent = computed(() => {
      if (isObject(content.value)) {
        const newContent = {};
        for (const key in content.value) {
          if (isObject(content.value[key])) {
            newContent[key] = {};
            for (const subKey in content.value[key]) {
              newContent[key][subKey] = parseContent(
                content.value[key][subKey]
              );
            }
          } else {
            newContent[key] = parseContent(content.value[key]);
          }
        }
        return newContent;
      } else {
        return parseContent(content.value);
      }
    });

    //* Table 1

    const tableHeaders = ref([
      "Token Holders",
      "Distribution",
      "Tokens",
      "Remarks",
      "Token Price",
    ]);
    const tableData = ref([
      {
        holders: "Presale",
        distribution: "%5",
        tokens: "5.000.000",
        remarks: "",
        tokenPrice: "$0.20",
      },
      {
        holders: "Public Sale - Round 1",
        distribution: "%5",
        tokens: "5.000.000",
        remarks: "",
        tokenPrice: "$0.30",
      },
      {
        holders: "Public Sale - Round 2",
        distribution: "%5",
        tokens: "5.000.000",
        remarks: "",
        tokenPrice: "$0.40",
      },
      {
        holders: "Liquidity Pool",
        distribution: "%3",
        tokens: "3.000.000",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "Team / Advisors",
        distribution: "%7",
        tokens: "7.000.000",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "Staking Rewards",
        distribution: "%8",
        tokens: "8.000.000",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "Eco-system Development",
        distribution: "%9",
        tokens: "9.000.000",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "Marketing",
        distribution: "%8",
        tokens: "8.000.000",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "TOKEN BURN",
        distribution: "%50",
        tokens: "50.000.000",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "TOTAL",
        distribution: "%100",
        tokens: "100.000.000",
        remarks: "",
        tokenPrice: "",
      },
    ]);

    //* Table 2

    const tableHeaders2 = ref([
      "Month",
      "Starting Token Count",
      "Monthly Burn",
      "Additional Burn (Est.)",
      "Ending Token Count",
    ]);

    const tableData2 = ref([
      {
        month: "January 2024",
        total: "100,000,000",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "95,833,333",
      },
      {
        month: "February 2024",
        total: "95,833,333",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "91,666,667",
      },
      {
        month: "March 2024",
        total: "91,666,667",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "87,500,000",
      },
      {
        month: "April 2024",
        total: "87,500,000",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "83,333,333",
      },
      {
        month: "May 2024",
        total: "83,333,333",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "79,166,667",
      },
      {
        month: "June 2024",
        total: "79,166,667",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "75,000,000",
      },
      {
        month: "July 2024",
        total: "75,000,000",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "70,833,333",
      },
      {
        month: "August 2024",
        total: "70,833,333",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "66,666,667",
      },
      {
        month: "September 2024",
        total: "66,666,667",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "62,500,000",
      },
      {
        month: "October 2024",
        total: "62,500,000",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "58,333,333",
      },
      {
        month: "November 2024",
        total: "58,333,333",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "54,166,667",
      },
      {
        month: "December 2024",
        total: "54,166,667",
        distribution: "4,166,667",
        remarks: "TBD",
        remaining: "50,000,000",
      },
    ]);

    const fadeUp = fadeUpAnimate;

    return {
      topic,
      // content,
      isObject,
      formatId,
      isOpen,
      formatKey,
      content: parsedContent,
      tableHeaders,
      tableData,
      tableData2,
      tableHeaders2,
      fadeUp,
    };
  },
});
</script>

<style>
/* CSS stilinizi buraya ekleyin */
/* .contentbg {
  background: url("../assets/content.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
} */
</style>
