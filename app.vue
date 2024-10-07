<template>
  <div>
    <nuxt-layout>
      <v-app>
        <NuxtPage />
      </v-app>
    </nuxt-layout>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  checkLoginStatus();
});

function checkLoginStatus() {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  if (isLoggedIn) {
    router.push("/");
  } else {
    router.push("/login");
  }
}
</script>
