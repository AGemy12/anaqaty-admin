<template>
  <section
    class="w-screen h-screen bg-[rgba(0,0,0,0.3)] fixed left-0 top-0 z-50 ] flex items-center justify-center"
    v-if="modelOpend"
  >
    <div
      class="w-[300px] md:w-[400px] h-[150px] bg-white shadow-shadow rounded-md flex flex-col justify-center items-center gap-7"
    >
      <!-- <h1 class="w-fit mx-auto font-bold text-[red]">
        هل أنت متأكد من أنك تريد حذف هذه الفئة؟
      </h1> -->
      <h1
        class="w-fit mx-auto text-[14px] md:text-[16px] font-bold flex items-center justify-center gap-2"
      >
        <Icon
          name="solar:danger-triangle-linear"
          class="text-[red] text-[25px]"
        />
        <span> {{ messageTitle }}</span>
      </h1>
      <div class="w-full flex items-center justify-center gap-6">
        <button
          class="w-[100px] md:w-[150px] text-[14px] md:text-[17px] font-bold h-[40px] rounded-md bg-black text-whit"
          @click="fireClcikYes"
        >
          نعم
        </button>
        <button
          class="w-[100px] md:w-[150px] text-[14px] md:text-[17px] font-bold h-[40px] rounded-md border-solid border-[1px] duration-300 hover:bg-black hover:text-white"
          @click="fireClcikNo"
        >
          لا
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  messageTitle: {
    type: String,
  },
  modelOpend: {
    type: Boolean,
    required: true,
  },
  fireClcikYes: {
    type: Function,
    required: true,
  },
  fireClcikNo: {
    type: Function,
    required: true,
  },
});
</script>
