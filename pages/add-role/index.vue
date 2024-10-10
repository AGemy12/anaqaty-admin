<template>
  <section>
    <PagesHeader title="إضافة مستخدم جديد" />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent="addRoleReq">
        <v-text-field
          v-model="role.title"
          label="اسم الدور"
          class="mb-4"
        ></v-text-field>

        <v-btn
          class="mt-0 !bg-black text-white !duration-300 hover:bg-black !tracking-[0]"
          type="submit"
          block
        >
          إضافة دور
        </v-btn>
      </v-form>
    </v-sheet>
    <AlertModel :is-opend="isOpen" :title="progressMessage" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PagesHeader from "~/components/mini/PagesHeader.vue";
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

// ###################################### End Add New User Message ===============================

const router = useRouter();
const role = ref({
  title: "",
});

const isOpen = ref(false);
const progressMessage = ref("");

const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpen.value = false;
      resolve();
    }, 2000);
  });
};

// ###################################### Start Get Users Roles Request ==========================

async function addRoleReq() {
  try {
    const res = await useNuxtApp().$axios.post("AddRole", role.value);

    if (res.status == 200) {
      progressMessage.value = res.data.message;
      isOpen.value = true;
      await showAlert();
      setTimeout(() => {
        router.push("/users/roles");
      }, 2000);
      role.value = {
        name: "",
      };
    }
  } catch (res) {
    isOpen.value = true;
    progressMessage.value =
      res.response.data.message || "حدث خطأ في السيرفر يرجى المحاولة لاخقا";
    await showAlert();
  }
}

// ###################################### End Get Users Roles Request ================================
</script>
