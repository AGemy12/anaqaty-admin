<template>
  <section>
    <PagesHeader title="تحديث الدور" />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent="fetchUpdateRole">
        <v-text-field
          v-model="role.title"
          label="إسم الفئة"
          class="mb-4"
        ></v-text-field>

        <v-btn
          class="mt-0 !bg-black text-white !duration-300 hover:bg-black !tracking-[0]"
          type="submit"
          block
        >
          تحديث الدور
        </v-btn>
      </v-form>
    </v-sheet>
    <AlertModel :is-opend="isOpen" :title="progressMessage" />
  </section>
</template>

<script setup>
// #################################### Start Auth And Title Page Details ###################################
definePageMeta({
  layout: "default",
  middleware: "auth",
});
useHead({
  title: "Anaqaty | تحديث فئة",
});
// #################################### End  Auth And Title Page Details ####################################

// #################################### Start Imports And Consts ###################################

import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AlertModel from "~/components/mini/AlertModel.vue";

const role = ref({
  title: "",
});
const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const progressMessage = ref("");

// #################################### End Imports And Consts ###################################

// #################################### Start Show Alert Model #################################
const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpen.value = false;
      resolve();
    }, 2000);
  });
};

// #################################### End Show Alert Model ###################################

// #################################### Start Get Roles Request ###################################
async function fetchRole() {
  try {
    const res = await useNuxtApp().$axios.get(`roles`);
    const index = route.query.index;

    if (res.data.roles && res.data.roles[index]) {
      role.value = res.data.roles[index];
    }
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ في السيرفر يرجى المحاولة لاحقا";
    isOpen.value = true;
    await showAlert();
  }
}
// #################################### End Get Roles Request ###################################

// #################################### Start Update Role Request ###################################
async function fetchUpdateRole() {
  try {
    const id = route.params.id;
    // console.log(id);
    const dataToSend = {
      ...role.value,
    };

    const res = await useNuxtApp().$axios.post(`UpdateRole/${id}`, dataToSend, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    progressMessage.value = res.data.message;
    isOpen.value = true;
    setTimeout(() => {
      router.push("/users/roles");
      route.params = "";
    }, 2000);
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ في السيرفر يرجى المحاولة لاحقا";
    isOpen.value = true;
    await showAlert();
  }
}
// #################################### End Update Role Request ###################################

onMounted(async () => {
  await fetchRole();
});
</script>
