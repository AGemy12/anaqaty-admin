<template>
  <section
    class="flex justify-center items-center h-[calc(100vh-40px)] overflow-hidden"
  >
    <div class="max-w-[400px] mx-auto">
      <img src="/black_logo.svg" alt="لوجو الموقع" />
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
useHead({
  title: "Anaqaty | الصفحة الرئيسية",
});
</script>
