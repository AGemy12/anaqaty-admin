<template>
  <v-app>
    <div v-if="loadingStore.loading" class="loading-bar"></div>
    <MenuBtn />
    <Sidebar />
    <slot />
  </v-app>
</template>

<script setup>
import MenuBtn from "~/components/mini/MenuBtn.vue";
import { useLoadingStore } from "~/stores/requestes-loading";

const loadingStore = useLoadingStore();
</script>

<style>
.loading-bar {
  position: fixed;
  top: 0;
  right: 0 !important;
  width: 100%;
  height: 3px;
  background-color: #3498db;
  z-index: 9999;
  animation: load 2s infinite ease;
  padding: 0 !important;
}

@keyframes load {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
