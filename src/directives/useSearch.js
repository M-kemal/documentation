import { ref, watch } from "vue";
import topics from "@/data.json";

export default function useSearch(searchQuery) {
  const searchResults = ref({});

  const performSearch = () => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) {
      searchResults.value = {};
      return;
    }

    searchResults.value = Object.entries(topics).reduce(
      (acc, [topicKey, topicValue]) => {
        // Konu başlıklarını ve içeriğini kontrol et
        const matchesTopic = topicKey.toLowerCase().includes(query);
        const matchesContent = Object.values(topicValue).some((content) =>
          content.toLowerCase().includes(query)
        );

        if (matchesTopic || matchesContent) {
          acc[topicKey] = topicValue;
        }

        return acc;
      },
      {}
    );
  };

  watch(searchQuery, performSearch);

  return { searchResults, performSearch };
}
