<template>
  <div
    class="content lg:p-4 sm:ml-72 lg:mr-64 border-r border-r-zinc-500 transition-all duration-300 ease-linear !pb-96 text-white"
    :class="{ 'blurBg': isOpen }"
  >
    <div
      v-for="(mainSection, mainKey) in topics"
      :key="mainKey"
      :id="formatId(mainKey)"
      class="mx-auto md:px-10"
    >
      <h2 class="!text-mkSecondary heading1 !text-center">
        {{ formatKey(mainKey) }}
      </h2>
      <p v-if="mainKey === 'Map and Future Plans'">
        The roadmap for the year 2024 includes:
      </p>
      <template v-if="isObject(mainSection)">
        <div
          v-for="(subSection, subKey) in mainSection"
          :key="subKey"
          :id="formatId(subKey)"
        >
          <h3 class="!text-mkSecondary/95 heading2 !mb-1 !mt-8">
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
          <p v-else v-html="subSection"></p>
          <div v-if="subKey === 'Evaluation and Expectations'" class="mt-8">
            <p class="heading3 underline !mb-2 !text-white">
              Contact and Updates
            </p>
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
                <a
                  href="www.blabla.com"
                  class="text-blue-300 hover:text-blue-500"
                  >www.blabla.com</a
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
          This roadmap comprehensively outlines WERK Token project's goals and
          main strategies for 2024, with each quarter set to contribute to the
          overall success and growth of the project.
        </p>
      </template>
      <p v-else>{{ mainSection }}</p>
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
              .map((item) => `<li class="list-disc">${item.trim()}</li>`)
              .join("");
            paragraph = `<ul>${listItems}</ul>`;
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
