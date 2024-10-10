<template>
  <section
    class="z-50 bg-alt w-screen h-screen fixed overflow-hidden top-0 right-0 flex flex-col gap-9 justify-center items-center"
  >
    <Logo />
    <div
      class="w-[320px] sm:w-[400px] mx-2 sm:mx-0 bg-alt shadow-shadow p-3 sm:p-8 rounded-md flex flex-col gap-6"
    >
      <h1 class="text-[1.2rem] font-bold w-fit mx-auto border-b-2">
        ! مرحبا بعودتك
      </h1>
      <v-sheet class="mx-auto bg-transparent w-full">
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="البريد الإلكتروني"
            class="mb-4"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            label="كلمة المرور"
            @click:append-inner="show1 = !show1"
            class="mb-3"
          ></v-text-field>

          <div class="flex justify-between items-center my-3">
            <v-checkbox class="!flex" label="تذكرني"></v-checkbox>
            <a
              href="/reset-password"
              class="text-light_black text-[0.9rem] duration-300 hover:text-black"
              >هل نسيت كلمة المرور ؟</a
            >
          </div>
          <v-btn
            class="mt-0 !bg-black text-white !duration-300 hover:bg-black !tracking-[0]"
            type="submit"
            block
            :loading="loading"
            >تسجيل الدخول</v-btn
          >
        </v-form>
      </v-sheet>
    </div>
    <AlertModel :title="ProgressMessage" :isOpend="isShowModel" />
  </section>
</template>

<script setup>
import Logo from "~/components/mini/Logo.vue";
import { ref } from "vue";
import Cookies from "js-cookie";
import AlertModel from "~/components/mini/AlertModel.vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "reg",
});
useHead({
  title: "تسجيل الدخول | Anaqaty",
});

const email = ref("");
const password = ref("");
const ProgressMessage = ref("");
const show1 = ref(false);
const loading = ref(false);
const isShowModel = ref(false);
const router = useRouter();

// ###################################### Start Form Validation =============================================

const emailRules = [
  (value) => {
    if (value) return true;
    return "يجب إدخال البريد الإلكتروني";
  },
  (value) => {
    const emailPattern = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(value)) return true;
    return "يجب إدخال بريد إلكتروني صالح";
  },
];

const passwordRules = [
  (value) => {
    if (value) return true;
    return "يجب إدخال كلمة المرور";
  },
  (value) => {
    if (value.length >= 6) return true;
    return "يجب ألا تقل كلمة المرور عن 6 أحرف";
  },
];

// ###################################### End Form Validation =============================================

// ###################################### Start Login Notifications Message ===============================

const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isShowModel.value = false;
      resolve();
    }, 2000);
  });
};
// ###################################### End Login Notifications Message ===============================

// ###################################### Start Login Request ===========================================

async function handleLogin() {
  loading.value = true;

  try {
    const response = await useNuxtApp().$axios.post("login", {
      email: email.value,
      password: password.value,
    });

    if (response.data.access_token) {
      const token = response.data.access_token;
      const user = response.data.user.name;

      Cookies.set("anaqaty_admin_token", token, { expires: 7 });
      Cookies.set("anaqaty_admin_user", user, { expires: 7 });

      // console.log(token, user);
      isShowModel.value = true;
      ProgressMessage.value = response.data.message;
      await showAlert();
      router.push("/");
    } else {
      console.error("خطأ في تسجيل الدخول:", response.data.message);
      isShowModel.value = true;
      ProgressMessage.value = response.data.message;
      await showAlert();
    }
  } catch (error) {
    isShowModel.value = true;

    ProgressMessage.value = error.response.data.message;

    await showAlert();
  } finally {
    loading.value = false;
  }
}

// ###################################### Start Login Request =============================================
</script>
