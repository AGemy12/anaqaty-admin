<template>
  <div
    class="alert_model fixed bottom-6 left-6 w-fit h-[50px] z-50 bg-[#7493e9] p-3 rounded-sm shadow-shadow"
    v-if="isOpend"
  >
    <p class="w-full text-white">{{ title }}</p>
  </div>
</template>

<script setup>
defineProps({
  isOpend: {
    type: Boolean,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
