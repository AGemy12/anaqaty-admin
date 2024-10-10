<template>
  <section>
    <PagesHeader title="إنشاء فئة جديدة" />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="category.name"
          label="إسم الفئة"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          v-model="category.description"
          label="وصف الفئة"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          v-model="category.slug"
          label="شكل الفئة في الرابط"
          class="mb-4"
        ></v-text-field>
        <v-switch
          v-model="category.IsActive"
          label="تفعيل الفئة"
          color="primary"
        ></v-switch>

        <v-btn
          class="mt-0 !bg-black text-white !duration-300 hover:bg-black !tracking-[0]"
          type="submit"
          block
        >
          إضافة فئة
        </v-btn>
      </v-form>
    </v-sheet>
    <AlertModel :is-opend="isOpen" :title="progressMessage" />
  </section>
</template>

<script setup>
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, watch } from "vue";
import AlertModel from "~/components/mini/AlertModel.vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "default",

  // Start <====> Auth Check <====>
  middleware: "auth",
  // End <====> Auth Check <====>
});
useHead({
  title: "Anaqaty | اضافة فئة",
});

const router = useRouter();
const category = ref({
  name: "",
  description: "",
  slug: "",
  IsActive: false,
});
const isOpen = ref(false);
const progressMessage = ref("");

const convertDescriptionToSlug = (description) => {
  return description.trim().replace(/\s+/g, "-");
};

watch(
  () => category.value.description,
  (newDescription) => {
    category.value.slug = convertDescriptionToSlug(newDescription);
  }
);
const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpen.value = false;
      resolve();
    }, 2000);
  });
};

async function handleLogin() {
  try {
    const dataToSend = {
      ...category.value,
      isActive: category.value.IsActive ? 1 : 0,
    };

    category.value = {
      name: "",
      description: "",
      slug: "",
      IsActive: false,
    };
    const response = await useNuxtApp().$axios.post("AddCategory", dataToSend);
    progressMessage.value = "تم إضافة فئة بنجاح";
    isOpen.value = true;
    router.push("/categories");
    await showAlert();
  } catch (error) {
    console.error(error);
    isOpen.value = true;
    progressMessage.value = "يجب ملئ البيانات";
    await showAlert();
  }
}
</script>
