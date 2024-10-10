<template>
  <v-app>
    <MenuBtn />
    <Sidebar />
    <slot />
  </v-app>
</template>

<script setup lang="ts">
import MenuBtn from "~/components/mini/MenuBtn.vue";
</script>
