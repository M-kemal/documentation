import { reactive } from "vue";

export const globalState = reactive({
  currentPage: {},
  headers: [],
  activeHeaderId: null,
});
