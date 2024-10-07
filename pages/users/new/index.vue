<template>
  <div>
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
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, computed } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const show1 = ref(false);

const nameRules = [
  (value) => {
    if (value) return true;
    return "يجب إدخال إسم للمستخدم";
  },
];

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

const isNameValid = computed(() => {
  return nameRules.every((rule) => rule(name.value) === true);
});

const isEmailValid = computed(() => {
  return emailRules.every((rule) => rule(email.value) === true);
});

const isPasswordValid = computed(() => {
  return passwordRules.every((rule) => rule(password.value) === true);
});

// الدوال للحصول على رسائل الخطأ
const emailError = computed(() => {
  const invalidRule = emailRules.find((rule) => rule(email.value) !== true);
  return invalidRule ? invalidRule(email.value) : "";
});

const passwordError = computed(() => {
  const invalidRule = passwordRules.find(
    (rule) => rule(password.value) !== true
  );
  return invalidRule ? invalidRule(password.value) : "";
});
</script>
