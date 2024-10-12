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
        <v-autocomplete
          label="اختر دور"
          :items="roles"
          :rules="rolesRules"
          v-model="selectedRoleId"
          item-text="name"
          item-value="id"
          class="mb-3"
          multiple
        ></v-autocomplete>

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
// ######################### Start Imports ############################
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { nameRules, emailRules, passwordRules } from "~/stores/validation";
import AlertModel from "~/components/mini/AlertModel.vue";
// ######################### End Imports ############################

// ######################### Start Auth And Head Page Details ############################
definePageMeta({
  layout: "default",

  middleware: "auth",
});
useHead({
  title: "Anaqaty | اضافة مستخدم",
});
// ######################### End Auth And Head Page Details ############################

// ######################### End Consts ############################
const router = useRouter();
const show1 = ref(false);
const roles = ref([]);
const selectedRoleId = ref([]);
const progressMessage = ref("");
const isOpen = ref(false);
const userData = ref({
  name: "",
  email: "",
  password: "",
  Roles: "",
});
// ######################### End Consts ############################

// ######################### Start Roles Rule ############################
const rolesRules = [
  (value) => {
    if (value) return true;
    return "يجب إختيار دور";
  },
];
// ######################### End Roles Rule ############################

// ###################################### End Add New User Message ################################

// ###################################### Start Get Users Roles Request ################################

async function fetchGetRoles() {
  try {
    const response = await useNuxtApp().$axios.get("roles");

    roles.value = response.data.roles;
  } catch (error) {
  } finally {
  }
}

// ###################################### End Get Users Roles Request ################################

// ###################################### Start Watch Selected Roles ################################
watch(selectedRoleId, (newRoleId) => {
  const selectedRoles = roles.value.filter((role) =>
    newRoleId.includes(role.id)
  );
  userData.value.Roles = selectedRoles.map((role) => role.id);
  // console.log("Selected Role IDs:", userData.value.Roles);
});

const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpen.value = false;
      resolve();
    }, 2000);
  });
};
// ###################################### End Watch Selected Roles ################################

// ###################################### Start Add New User Request ##################################

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
    }
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ في السيرفر يرجى المحاولة لاخقا";
    isOpen.value = true;
  } finally {
    await showAlert();
  }
}

// ###################################### End Add New User Request ##################################=

onMounted(() => {
  fetchGetRoles();
});
</script>
