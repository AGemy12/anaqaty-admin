<template>
  <div class="w-fit my-[1rem] mx-auto">
    <a href="/" class="block" v-if="isLink">
      <img src="/black_logo.svg" alt="شعار مجلة أناقتي" class="w-[120px]" />
    </a>
    <img
      src="/black_logo.svg"
      alt="شعار مجلة أناقتي"
      class="w-[120px]"
      v-else
    />
  </div>
</template>

<script>
export default {
  props: {
    isLink: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
