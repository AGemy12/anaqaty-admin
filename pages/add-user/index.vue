<template>
  <section>
    <PagesHeader title="إضافة مستخدم جديد" />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent="fetchAddUser">
        <v-text-field
          v-model="userData.name"
          :rules="nameRules"
          label="اسم المستخدم"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          v-model="userData.email"
          :rules="emailRules"
          label="البريد الإلكتروني"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          v-model="userData.password"
          :rules="passwordRules"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          label="كلمة المرور"
          @click:append-inner="show1 = !show1"
          class="mb-3"
        ></v-text-field>
        <v-select
          label="اختر دور"
          :items="roles"
          :rules="rolesRules"
          v-model="selectedRoleId"
          item-text="name"
          item-value="id"
          class="mb-3"
        ></v-select>

        <v-btn
          class="mt-0 !bg-black text-white !duration-300 hover:bg-black !tracking-[0]"
          type="submit"
          block
        >
          إضافة مستخدم
        </v-btn>
      </v-form>
    </v-sheet>
    <AlertModel :is-opend="isOpen" :title="progressMessage" />
  </section>
</template>

<script setup>
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, toRaw, onMounted } from "vue";
import { useRouter } from "vue-router";

import { nameRules, emailRules, passwordRules } from "~/stores/validation";
import AlertModel from "~/components/mini/AlertModel.vue";

definePageMeta({
  layout: "default",

  // Start <====> Auth Check <====>
  middleware: "auth",
  // End <====> Auth Check <====>
});
useHead({
  title: "Anaqaty | اضافة مستخدم",
});

const router = useRouter();
const show1 = ref(false);
const roles = ref([]);
const selectedRoleId = ref("");
const progressMessage = ref("");
const isOpen = ref(false);
const rolesRules = [
  (value) => {
    if (value) return true;
    return "يجب إختيار دور";
  },
];
const userData = ref({
  name: "",
  email: "",
  password: "",
  Roles: "",
});

// ###################################### End Add New User Message ===============================

// ###################################### Start Get Users Roles Request ==========================

async function fetchGetRoles() {
  try {
    const response = await useNuxtApp().$axios.get("roles");

    roles.value = response.data.roles;
    console.log(roles);
    console.log("Response Data:", roles);
  } catch (error) {
  } finally {
  }
}

// ###################################### End Get Users Roles Request ================================

watch(selectedRoleId, (newRoleId) => {
  const selectedRole = roles.value.find((role) => role.id === newRoleId);

  userData.value.Roles = selectedRole ? selectedRole.id : null;

  console.log("Selected Role ID:", userData.value.Roles);
});

const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpen.value = false;
      resolve();
    }, 2000);
  });
};

// ###################################### Start Add New User Request ==========================

async function fetchAddUser() {
  try {
    const dataToSend = {
      ...userData.value,
    };

    const res = await useNuxtApp().$axios.post("AddUser", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 200) {
      progressMessage.value = res.data.message;
      isOpen.value = true;
      setTimeout(() => {
        router.push("/users");
      }, 2000);
      await showAlert();
    }
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ في السيرفر يرجى المحاولة لاخقا";
    isOpen.value = true;
    setTimeout(() => {
      router.push("/users");
    }, 2000);
    await showAlert();
  }
}

// ###################################### End Add New User Request ================================

onMounted(() => {
  fetchGetRoles();
});
</script>
