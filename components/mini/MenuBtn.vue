<template>
  <button
    class="w-[40px] h-[40px] md:hidden bg-white shadow-shadow rounded-sm z-10 absolute top-6 right-6 flex items-center justify-center"
    @click="menuBtnHandel"
  >
    <Icon name="octicon:three-bars-24" class="text-[25px]" />
  </button>
</template>

<script setup lang="ts">
import { useNavStore } from "@/stores/navbarStore";
const navStore = useNavStore();
const menuBtnHandel = () => {
  navStore.toggleMenu();
};
</script>
