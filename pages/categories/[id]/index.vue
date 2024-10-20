<template>
  <section>
    <PagesHeader title="تحديث فئة" />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent="fetchUpdateCategory">
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
          تحديث الفئة
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
import { useRoute } from "vue-router";
import qs from "qs";
import AlertModel from "~/components/mini/AlertModel.vue";
// ######################### End Imports ############################

// ######################### Start Auth And Head Page Details ############################

definePageMeta({
  layout: "default",
  middleware: "auth",
});
useHead({
  title: "Anaqaty | تحديث فئة",
});
// ######################### Start Auth And Head Page Details ############################

// ######################### Start Consts ############################

const category = ref({
  name: "",
  description: "",
  slug: "",
  IsActive: true,
});
const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const progressMessage = ref("");

// ######################### End Consts ############################

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
// ########################### Start Rmove Spaces And Set (-) Func  ##################################

const convertKeywordToSlug = (name) => {
  return name.trim().replace(/\s+/g, "-");
};
// ########################### End Rmove Spaces And Set (-) Func  ##################################

// ########################### Start Watch To Set Old Slug Value  ##################################
watch(
  () => category.value.name,
  (newCategory) => {
    category.value.slug = convertKeywordToSlug(newCategory);
  }
);
// ########################### End Watch To Set Old Slug Value  ##################################

// ######################### Start Get All Categories Request ############################
async function fetchCategory() {
  try {
    const res = await useNuxtApp().$axios.get(`categories`);
    const index = route.query.index;

    if (res.data.categories && res.data.categories[index]) {
      category.value = res.data.categories[index];

      category.value.IsActive = category.value.IsActive === 1;
    }
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ أثناء تحديث الفئة";
    isOpen.value = true;
  }
}

// ######################### End Get All Categories Request ############################

// ######################### Start Update Category Request ############################
async function fetchUpdateCategory() {
  try {
    const index = route.query.index;
    const id = route.params.id;
    // console.log(id);

    const dataToSend = {
      ...category.value,
      IsActive: category.value.IsActive ? 1 : 0,
    };

    const formData = qs.stringify(dataToSend);

    await useNuxtApp().$axios.put(`UpdateCategory/${id}`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    progressMessage.value = "تم تحديث الفئة بنجاح";
    isOpen.value = true;

    setTimeout(() => {
      router.push("/categories");
      route.params = "";
      window.location.reload();
    }, 2000);
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ أثناء تحديث الفئة";
    isOpen.value = true;
  } finally {
    await showAlert();
  }
}
// ######################### End Update Category Request ############################

onMounted(async () => {
  await fetchCategory();
});
</script>
