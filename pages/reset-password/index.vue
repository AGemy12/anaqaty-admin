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
        <v-form @submit.prevent>
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
    </div>
  </section>
</template>

<script>
import Logo from "~/components/mini/Logo.vue";

definePageMeta({
  layout: "reg",
});
export default {
  data: () => ({
    email: "",
    password: "",
    emailRules: [
      (value) => {
        if (value) return true;
        return "يجب إدخال البريد الإلكتروني";
      },
      (value) => {
        const emailPattern = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}\.com$/;
        if (emailPattern.test(value)) return true;
        return "يجب إدخال بريد إلكتروني صالح";
      },
    ],
    passwordRules: [
      (value) => {
        if (value) return true;
        return "يجب إدخال كلمة المرور";
      },
      (value) => {
        if (value.length >= 6) return true;
        return "يجب ألا تقل كلمة المرور عن 6 أحرف";
      },
    ],
  }),
  components: {
    Logo,
  },
};
</script>
