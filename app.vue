<template>
  <nuxt-layout>
    <v-app>
      <NuxtPage />
    </v-app>
  </nuxt-layout>
</template>

<script setup>
useHead({
  title: "Anaqaty | اناقتي",
  script: [
    {
      src: "https://cdn.ckeditor.com/ckeditor5/38.0.1/classic/ckeditor.js",
      defer: true,
    },
  ],
});
</script>
