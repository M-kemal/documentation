<template>
  <div class="flex justify-center mt-6 mx-auto">
    <div class="container mx-auto mt-4">
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <thead>
            <tr class="bg-gray-800 text-white border text-left text-sm">
              <th class="px-4 py-2" v-for="header in headers" :key="header">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="text-white">
            <tr v-for="row in data" :key="row.id">
              <td
                v-for="(value, key, index) in row"
                :key="key"
                :class="getClass(index)"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  props: {
    headers: Array,
    data: Array,
  },
  setup() {
    const columnColors = reactive({
      1: "bg-[#14558e]",
      2: "bg-[#B70404]",
      3: "bg-[#14558e]",
      4: "bg-[#B70404]",
    });

    const getClass = (index) => {
      if (index === 0) {
        return "border border-gray-300 px-4 py-2 bg-gray-800 text-gray-200 text-sm font-semibold";
      } else {
        return `border border-gray-300 px-4 py-2 text-xs ${
          columnColors[index] || ""
        }`;
      }
    };

    return { getClass };
  },
};
</script>

<style scoped>
@media (max-width: 600px) {
  .table-auto th,
  .table-auto td {
    /* padding: 10px; */
    font-size: 14px;
  }
}
</style>
