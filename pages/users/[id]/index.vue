<template>
  <section>
    <PagesHeader
      title="إنشاء مستخدم جديد
"
    />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="الإسم"
          class="mb-4"
        ></v-text-field>
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

        <v-btn
          class="mt-0 !bg-black text-white !duration-300 hover:bg-black !tracking-[0]"
          type="submit"
          block
        >
          إضافة مستخدم
        </v-btn>
      </v-form>
    </v-sheet>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "default",

  // Start <====> Auth Check <====>
  middleware: "auth",
  // End <====> Auth Check <====>
});
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { nameRules, emailRules, passwordRules } from "~/stores/validation";

import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const show1 = ref(false);
</script>
