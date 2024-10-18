<template>
  <section
    class="z-50 bg-alt w-screen h-screen fixed overflow-hidden top-0 right-0 flex flex-col gap-9 justify-center items-center"
  >
    <Logo />
    <div
      class="w-[320px] sm:w-[400px] mx-2 sm:mx-0 bg-alt shadow-shadow p-3 sm:p-8 rounded-md flex flex-col gap-6"
    >
      <h1 class="text-[1.2rem] font-bold w-fit mx-auto border-b-2">
        نسيت كلمة المرور ؟
      </h1>
      <v-sheet class="mx-auto bg-transparent w-full">
        <v-form @submit.prevent="handleSendResMail">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="البريد الإلكتروني"
            class="mb-4"
          ></v-text-field>

          <v-btn
            class="mt-0 !bg-black text-white !duration-300 hover:bg-black !tracking-[0]"
            type="submit"
            block
          >
            إرسال رابط إعادة تعيين كلمة المرور</v-btn
          >
        </v-form>
      </v-sheet>
      <AlertModel :is-opend="isOpen" :title="progressMessage" />
    </div>
  </section>
</template>

<script setup>
import Logo from "~/components/mini/Logo.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import AlertModel from "~/components/mini/AlertModel.vue";
definePageMeta({
  layout: "reg",
});
useHead({
  title: "Anaqaty | نسيت كلمة المرور",
});
const router = useRouter();
const isOpen = ref(false);
const progressMessage = ref("");
const email = ref("");

const emailRules = [
  (value) => {
    if (value) return true;
    return "يجب إدخال البريد الإلكتروني";
  },
  (value) => {
    const emailPattern = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}\.com$/;
    if (emailPattern.test(value)) return true;
    return "يجب إدخال بريد إلكتروني صالح";
  },
];

// ###################################### Start Show Alert Func ################################
const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpen.value = false;
      resolve();
    }, 2000);
  });
};
// ###################################### End Show Alert Func ################################

// ###################################### Start Login Request ===========================================

async function handleSendResMail() {
  try {
    const res = await useNuxtApp().$axios.post("sendResetLink", {
      email: email.value,
    });

    if (res.status >= 200) {
      isOpen.value = true;
      progressMessage.value = res.data.message;
      await showAlert();
      router.push("/");
      email.value = "";
    } else {
      isOpen.value = true;
      progressMessage.value = res.data.message;
    }
  } catch (res) {
    isOpen.value = true;
    progressMessage.value = res.response.data.message;
  } finally {
    await showAlert();
  }
}

// ###################################### Start Login Request =============================================
</script>
