<template>
  <div class="group my-4 w-fit">
    <button
      :class="`p-3 bg-[rgba(0,0,0,0.8)] text-alt text-[14px] rounded-md duration-500 group-hover:bg-black ${addStyle} `"
      @click="fireClick"
    >
      {{ title }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  fireClick: {
    type: Function,
    required: false,
  },
  addStyle: {
    type: String,
  },
});
</script>
