<template>
  <section>
    <PagesHeader title="تحديث بيانات المستخدم" />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent="fetchUpdateUser">
        <v-text-field
          v-model="userData.name"
          :rules="nameRules"
          label="إسم المستخدم"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          :rules="emailRules"
          v-model="userData.email"
          label="البريد الإلكتروني"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          :rules="passwordRules"
          v-model="userData.password"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append-inner="show1 = !show1"
          label="كلمة المرور "
          class="mb-4"
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
          تحديث البيانات
        </v-btn>
      </v-form>
    </v-sheet>
    <AlertModel :is-opend="isOpen" :title="progressMessage" />
  </section>
</template>

<script setup>
// #################################### Start Imports  #################################

import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AlertModel from "~/components/mini/AlertModel.vue";
import { nameRules, emailRules, passwordRules } from "#imports";
// #################################### End Imports  #################################

// #################################### Start Auth And Head Page Details #################################
definePageMeta({
  layout: "default",
  middleware: "auth",
});
useHead({
  title: "Anaqaty | تحديث فئة",
});
// #################################### End Auth And Head Page Details #################################

// #################################### Start Consts #################################
const selectedRoleId = ref([]);
const show1 = ref(false);
const roles = ref([]);
const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const progressMessage = ref("");
const userData = ref({
  name: "",
  email: "",
  password: "",
  password: "",
  Roles: "",
});
// #################################### End Consts #################################

// #################################### Start Roles Rules #################################

const rolesRules = [
  (value) => {
    if (value) return true;
    return "يجب إختيار دور";
  },
];
// #################################### End Roles Rules #################################

// #################################### Start Show Alert Model #################################
const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpen.value = false;
      resolve();
    }, 2000);
  });
};

//################################## End Show Alert Model ###################################

// ################################# Start Get All Users Request ###########################
async function fetchGetUsers() {
  try {
    const res = await useNuxtApp().$axios.get(`users`);
    const index = route.query.index;

    if (res.status >= 200) {
      userData.value = res.data.users[index];
      selectedRoleId.value = res.data.users[index].roles;
    }
  } catch (error) {
    console.error("خطأ في جلب الفئة:", error);
  }
}
// ###################################### End Get All Users Request #############################

// ###################################### Start Get All Roles Request ###########################

async function fetchGetRoles() {
  try {
    const res = await useNuxtApp().$axios.get(`roles`);
    const index = route.query.index;

    if (res.status >= 200) {
      roles.value = res.data.roles;
    }
  } catch (error) {
    console.error("خطأ في جلب الفئة:", error);
  }
}
// ###################################### End Get All Roles Request ############################

// ###################################### End Watch Selected Roles ############################

watch(selectedRoleId, (newRoleId) => {
  const selectedRoles = roles.value.filter((role) =>
    newRoleId.includes(role.id)
  );
  userData.value.Roles = selectedRoles.map((role) => role.id);
  // console.log("Selected Role IDs:", userData.value.Roles);
});
// ###################################### End Watch Selected Roles ############################

// ###################################### Start Update User Request ############################
async function fetchUpdateUser() {
  try {
    const id = route.params.id;
    // console.log(id);

    const dataToSend = {
      ...userData.value,
    };

    await useNuxtApp().$axios.put(`Updateuser/${id}`, dataToSend, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    progressMessage.value = "تم تحديث بيانات المستخدم بنجاح";
    isOpen.value = true;
    setTimeout(() => {
      router.push("/users");
      route.params = "";
    }, 2000);
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ أثناء تحديث بيانات المستخدم";
    isOpen.value = true;
  } finally {
    await showAlert();
  }
}

onMounted(async () => {
  await fetchGetUsers();
  fetchGetRoles();
});

// ###################################### End Update User Request ===============================
</script>
