<template>
  <div
    class="content lg:p-4 sm:ml-64 lg:mr-64 border-r border-r-zinc-500/25 transition-all duration-300 ease-linear md:!pb-96 text-white/85"
    :class="{ 'blurBg': isOpen }"
  >
    <div
      v-for="(mainSection, mainKey) in topics"
      :key="mainKey"
      :id="formatId(mainKey)"
      class="mx-auto px-4 md:px-10"
    >
      <h2
        class="text-center flex items-center justify-center flex-wrap w-3/4 md:w-10/12 mx-auto !text-2xl lg:!text-5xl font-header font-semibold !bg-clip-text !text-transparent bg-gradient-to-r from-mkSecondary to-white contentbg py-4 mt-4"
      >
        {{ formatKey(mainKey) }}
      </h2>
      <div class="gradientLine"></div>

      <p
        v-if="mainKey === 'Map and Future Plans'"
        class="!text-white pt-8 !pb-0 !mb-0 heading3 !text-center underline underline-offset-8"
      >
        The roadmap for the year
        <span class="text-mkSecondary">2024</span> includes
      </p>

      <template v-if="isObject(mainSection)">
        <div
          v-for="(subSection, subKey) in mainSection"
          :key="subKey"
          :id="formatId(subKey)"
        >
          <h3
            class="!bg-clip-text !text-transparent bg-gradient-to-r from-mkSecondary to-white heading2 !mb-1 !mt-8"
          >
            {{ subKey }}
          </h3>

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
          <p v-else v-html="subSection" class=""></p>
          <div v-if="subKey === 'Evaluation and Expectations'" class="mt-8">
            <p class="heading3 underline !mb-2 !text-white">
              Contact and Updates
            </p>
            <div class="flex flex-col">
              <div>
              <span class="text-white mr-2">E-Mail :</span>
              <a
                href="mailto:info@comingsoon.com"
                class="text-blue-300 hover:text-blue-500"
                >info@comingsoon.com</a
              >
            </div>
            <div>
              <span class="text-white mr-2">WebSite :</span>
              <a href="https://werk1000x.netlify.app/" class="text-blue-300 hover:text-blue-500"
                >https://werk1000x.netlify.app/</a
              >
            </div>
            </div>
          </div>
          <!--! Table1 -->
          <LayoutTable
            :headers="tableHeaders"
            :data="tableData"
            v-if="
              mainKey === 'Token Economics, Distribution, and Staking Policy'
            "
          />
          <!--! Table1 -->
          <!--* PieCard -->
          <PieCard
            v-if="
              mainKey === 'Token Economics, Distribution, and Staking Policy'
            "
          />
          <!--* PieCard -->
          <!--! Table2 -->
          <LayoutTable
            :headers="tableHeaders2"
            :data="tableData2"
            v-if="
              mainKey === 'Token Economics, Distribution, and Staking Policy'
            "
          />
          <!--! Table2 -->
        </div>
        <p v-if="mainKey === 'Map and Future Plans'" class="py-10">
          This roadmap comprehensively outlines WERK 1000X project's goals and
          main strategies for 2024, with each quarter set to contribute to the
          overall success and growth of the project.
        </p>
      </template>
      <p v-else>{{ mainSection }}</p>
    </div>
    <div class="header pt-8">
    <h3 class="py-4  ml-2 flex items-center justify-center text-xl">
      <a href="https://werk1000x.netlify.app/" class="bg-clip-text text-transparent bg-gradient-to-r from-mkSecondary to-white border p-4">Go to WebSite</a>
    </h3>

    <!-- <div class="gradientLine mx-auto md:ml-2"></div> -->
  </div>
    <LayoutFooter class="mt-8" />
  </div>
</template>

<script>
import { computed, inject, reactive, ref, watchEffect } from "vue";
import topics from "@/data.json";
import LayoutTable from "@/components/LayoutTable.vue";
import PieCard from "@/components/PieCard.vue";
import LayoutFooter from "@/components/LayoutFooter.vue";

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
    const formatKey = (key) => key.replace(/([A-Z])/g, " $1").trim();
    //* data yazım
    // function parseContent(text) {
    //   const regex =
    //     /(\*\*(.*?)\*\*)|(\*(.*?)\*)|(_(.*?)_)|(\{([a-zA-Z]+)\}(.*?)\{\/\8\})/g;
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
    // const parsedTopics = computed(() => {
    //   const parseSection = (section) => {
    //     if (isObject(section)) {
    //       const newSection = {};
    //       for (const key in section) {
    //         newSection[key] = parseSection(section[key]);
    //       }
    //       return newSection;
    //     } else if (typeof section === "string") {
    //       return parseContent(section);
    //     }
    //     return section;
    //   };
    //   return parseSection(reactiveData);
    // });
    //* topicContentYazımı
    function parseContent(text) {
      // '?' işaretine göre paragraflara ayır
      return text
        .split("?")
        .map((paragraph) => {
          // '=' işaretine göre listeye ayır
          if (paragraph.includes("=")) {
            const listItems = paragraph
              .split("=")
              .map((item) => `<li class="mb-4">${item.trim()}</li>`)
              .join("");
            paragraph = `<ul class="ml-4 list-image-[url(checkmark-fill.svg)]">${listItems}</ul>`;
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
      if (isObject(reactiveData)) {
        const newContent = {};
        for (const key in reactiveData) {
          if (isObject(reactiveData[key])) {
            newContent[key] = {};
            for (const subKey in reactiveData[key]) {
              newContent[key][subKey] = parseContent(reactiveData[key][subKey]);
            }
          } else {
            newContent[key] = parseContent(reactiveData[key]);
          }
        }
        return newContent;
      } else {
        return parseContent(reactiveData);
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

    return {
      topics: parsedContent,
      subHeadings,
      isObject,
      formatId,
      isOpen,
      formatKey,
      tableData,
      tableData2,
      tableHeaders,
      tableHeaders2,
    };
  },
  components: { LayoutTable, PieCard, LayoutFooter },
};
</script>

<style></style>
