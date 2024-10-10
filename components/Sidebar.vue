<template>
  <section
    :class="`z-50 fixed right-0 top-0  py-9 px-[1rem] duration-500 md:translate-x-0 w-[300px] bg-white shadow-shadow  h-screen overflow-auto shrink-0 ${
      menuIsOpen ? 'translate-x-0 w-full ' : 'translate-x-full'
    } `"
  >
    <div
      class="absolute top-4 right-4 cursor-pointer block md:hidden"
      @click="toggleMenu"
    >
      <Icon name="material-symbols:close-rounded" class="text-[1.3rem]" />
    </div>
    <h1 class="text-[0.9rem] font-bold w-fit mx-auto my-2" v-if="isLogedIn">
      مرحبا, {{ userName }}
    </h1>
    <div class="flex flex-col relative">
      <Logo :isLink="true" />
      <Navbar />
    </div>
  </section>
</template>

<script setup>
import Logo from "./mini/Logo.vue";
import Navbar from "./mini/Navbar.vue";
import { useNavStore } from "@/stores/navbarStore";
import Cookies from "js-cookie";
const isLogedIn = true;
const navStore = useNavStore();
const menuIsOpen = computed(() => navStore.openMenu);
const toggleMenu = () => {
  navStore.toggleMenu();
};

const userName = Cookies.get("anaqaty_admin_user");
</script>
