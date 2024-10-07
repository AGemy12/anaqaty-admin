import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavStore = defineStore("navStore", () => {
  // Start <====> Open Nested List  <====>
  const openItem = ref({});
  const openMenu = ref(false);

  const toggleItem = (id) => {
    if (!openItem.value.hasOwnProperty(id)) {
      openItem.value[id] = false;
    }
    openItem.value[id] = !openItem.value[id];
  };
  // End   <====> Open Nested List  <====>

  // Start <====> Toggler Menu  <====>

  const toggleMenu = () => {
    openMenu.value = !openMenu.value;
  };
  // End   <====> Toggler Menu  <====>

  return {
    openItem,
    openMenu,
    toggleItem,
    toggleMenu,
  };
});
