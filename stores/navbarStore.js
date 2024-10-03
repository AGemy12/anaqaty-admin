import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavStore = defineStore("navStore", () => {
  const openItem = ref({});

  const toggleItem = (id) => {
    if (!openItem.value.hasOwnProperty(id)) {
      openItem.value[id] = false;
    }
    openItem.value[id] = !openItem.value[id];
  };

  return {
    openItem,
    toggleItem,
  };
});
