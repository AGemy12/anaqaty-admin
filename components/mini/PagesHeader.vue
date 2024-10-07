<template>
  <h1 class="w-fit mx-auto my-[2rem] font-bold text-[20px]">{{ title }}</h1>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
