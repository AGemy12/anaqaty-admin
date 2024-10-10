<template>
  <section class="flex justify-center items-center h-screen">
    <div class="max-w-[400px] mx-auto">
      <img src="/black_logo.svg" alt="لوجو الموقع" />
    </div>
  </section>
</template>

<script setup>
// Start <====> Auth Check <====>
definePageMeta({
  middleware: "auth",
});
useHead({
  title: "Anaqaty |  الصفحة الرئيسية",
});
// End <====> Auth Check <====>
</script>
