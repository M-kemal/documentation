<template>
  <div
    class="content lg:p-4 sm:ml-64 lg:mr-64 border-r border-r-zinc-500/25 transition-all duration-300 ease-linear"
    :class="{ 'blurBg': isOpen }"
  >
  
    <h1
      class="text-center flex items-center justify-center flex-wrap w-3/4 md:w-10/12 mx-auto !text-2xl lg:!text-5xl font-header font-semibold bg-clip-text text-transparent bg-gradient-to-r from-mkSecondary to-white contentbg py-4 mt-4"
    >
      {{ formatKey(topic) }}
    </h1>
    <div class="mx-auto px-4 md:px-10">
      <div class="gradientLine"></div>
    </div>
    <div v-if="isObject(content)" class="pb-4 md:pb-96 px-4 md:px-10">
      <!--* Özel Bölüm -->
      <p
        v-if="topic === 'Map and Future Plans'"
        class="!text-white/85 pt-8 !pb-0 !mb-0 heading3 !text-center underline underline-offset-8"
      >
        The roadmap for the year
        <span class="text-mkSecondary">2024</span> includes
      </p>
      <!--* Özel Bölüm -->
      <section v-for="(subContent, subKey) in content" :key="subKey" class="">
        <h2
          :id="formatId(subKey)"
          class="heading2 mt-10 !bg-clip-text !text-transparent bg-gradient-to-r from-mkSecondary to-white !mb-0 pb-0"
        >
          {{ subKey }}
        </h2>

        <div v-if="isObject(subContent)">
          <div v-for="(desc, key) in subContent" :key="key">
            <h3 class="heading3 !mb-2 !text-emerald-500">{{ key }}</h3>
            <p class="text-white/85" v-html="desc"></p>
          </div>
        </div>

        <p v-else class="text-text" v-html="subContent"></p>
        <div v-if="subKey === 'Evaluation and Expectations'" class="mt-8">
          <!--* Özel Bölüm -->
          <p class="heading3 underline !mb-2 !text-white">
            Contact and Updates
          </p>
          <!--* Özel Bölüm -->
          <!--* Özel Bölüm -->
          <div class="flex flex-col">
            <div>
              <span class="text-white mr-2">E-Mail :</span>
              <a
                href="mailto:info@blabla.com"
                class="text-blue-300 hover:text-blue-500"
                >info@blabla.com</a
              >
            </div>
            <div>
              <span class="text-white mr-2">WebSite :</span>
              <a href="www.blabla.com" class="text-blue-300 hover:text-blue-500"
                >www.blabla.com</a
              >
            </div>
          </div>
          <!--* Özel Bölüm -->
        </div>
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
      <p v-if="topic === 'Map and Future Plans'" class="text-white py-8">
        This roadmap comprehensively outlines WERK 1000X project's goals and
        main strategies for 2024, with each quarter set to contribute to the
        overall success and growth of the project.
      </p>
    </div>
    <p v-else v-html="content"></p>
    <div class="header ">
    <h3 class="py-4  ml-2 flex items-center justify-center text-xl">
      <a href="https://yasinbg.github.io/yourwerk/" class="bg-clip-text text-transparent bg-gradient-to-r from-mkSecondary to-white border p-4">Go to WebSite</a>
    </h3>

    <div class="gradientLine mx-auto md:ml-2"></div>
  </div>
    <LayoutFooter />
  </div>
</template>

<script>
import { defineComponent, computed, inject, ref } from "vue";
import { useRoute } from "vue-router";
// import topics from "@/data.json";
import PieCard from "@/components/PieCard.vue";
import LayoutTable from "./LayoutTable.vue";
import { fadeUpAnimate } from "@/directives/mkAnimate";
import LayoutFooter from "@/components/LayoutFooter.vue";
export default defineComponent({
  props: {
    topics: {
      type: Object,
    },
  },
  components: {
    PieCard,
    LayoutTable,
    LayoutFooter,
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

    /* function parseContent(text) {
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
*/

    function parseContent(text) {
      // '?' işaretine göre paragraflara ayır
      return text
        .split("?")
        .map((paragraph) => {
          // '=' işaretine göre listeye ayır
          if (paragraph.includes("=")) {
            const listItems = paragraph
              .split("=")
              .map(
                (item) =>
                  `<li class="list-image-[url(checkmark-fill.svg)] mb-4">${item.trim()}</li>`
              )
              .join("");
            paragraph = `<ul class="ml-4">${listItems}</ul>`;
            return `<p class="mt-4">${paragraph.trim()}</p>`;
          }

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
        tokens: "50",
        remarks: "",
        tokenPrice: "$20.000",
      },
      {
        holders: "Public Sale - Round 1",
        distribution: "%5",
        tokens: "50",
        remarks: "",
        tokenPrice: "$30.000",
      },
      {
        holders: "Public Sale - Round 2",
        distribution: "%5",
        tokens: "50",
        remarks: "",
        tokenPrice: "$40.000",
      },
      {
        holders: "Liquidity Pool",
        distribution: "%3",
        tokens: "30",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "Team / Advisors",
        distribution: "%7",
        tokens: "70",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "Staking Rewards",
        distribution: "%8",
        tokens: "80",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "Eco-system Development",
        distribution: "%9",
        tokens: "90",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "Marketing",
        distribution: "%8",
        tokens: "80",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "TOKEN BURN",
        distribution: "%50",
        tokens: "500",
        remarks: "",
        tokenPrice: "",
      },
      {
        holders: "TOTAL",
        distribution: "%100",
        tokens: "1000",
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
        total: "1.000",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "958,33333",
      },
      {
        month: "February 2024",
        total: "958,33333",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "916,66667",
      },
      {
        month: "March 2024",
        total: "916,66667",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "875",
      },
      {
        month: "April 2024",
        total: "875",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "833,33333",
      },
      {
        month: "May 2024",
        total: "833,33333",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "791,66667",
      },
      {
        month: "June 2024",
        total: "791,66667",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "750",
      },
      {
        month: "July 2024",
        total: "750",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "708,33333",
      },
      {
        month: "August 2024",
        total: "708,33333",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "666,66667",
      },
      {
        month: "September 2024",
        total: "666,66667",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "625",
      },
      {
        month: "October 2024",
        total: "625",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "583,33333",
      },
      {
        month: "November 2024",
        total: "583,33333",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "541,66667",
      },
      {
        month: "December 2024",
        total: "541,66667",
        distribution: "41,66667",
        remarks: "TBD",
        remaining: "500",
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
.contentbg {
  background: url("../assets/content.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
