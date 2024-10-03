<template>
  <section
    class="z-50 fixed right-0 top-0 p-[1rem] sidebar w-[300px] bg-alt shadow-shadow h-screen shrink-0"
  >
    <div class="flex flex-col">
      <Logo :isLink="true" />
      <Navbar />
    </div>
  </section>
</template>

<script setup>
import Logo from "./mini/Logo.vue";
import Navbar from "./mini/Navbar.vue";
</script>
