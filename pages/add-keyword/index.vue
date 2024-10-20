<template>
  <section>
    <PagesHeader title="إضافة كلمة مفتاحية جديدة" />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent="addKeyword">
        <v-text-field
          v-model="keyword.keyword"
          label="العنوان"
          class="mb-4"
        ></v-text-field>
        <!-- <v-text-field
          v-model="keyword.meta_keywords"
          label="الكلمة الدلالية"
          class="mb-4"
        ></v-text-field> -->
        <v-text-field
          v-model="keyword.slug"
          label="الشكل في الرابط"
          class="mb-4"
        ></v-text-field>
        <v-switch
          v-model="keyword.IsActive"
          label="تفعيل الكلمة المفتاحية"
          color="primary"
        ></v-switch>

        <v-btn
          class="mt-0 !bg-black text-white !duration-300 hover:bg-black !tracking-[0]"
          type="submit"
          block
        >
          إضافة كلمة مفتاحية
        </v-btn>
      </v-form>
    </v-sheet>
    <AlertModel :is-opend="isOpen" :title="progressMessage" />
  </section>
</template>

<script setup>
// ########################### Start imports ##################################
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, watch } from "vue";
import AlertModel from "~/components/mini/AlertModel.vue";
import { useRouter } from "vue-router";
// ########################### End imports ##################################

// ########################### Start Auth And Head Page Details ##################################
definePageMeta({
  layout: "default",

  // Start <====> Auth Check <====>
  middleware: "auth",
  // End <====> Auth Check <====>
});
useHead({
  title: "Anaqaty | اضافة كلمة مفتاحية",
});
// ########################### End Auth And Head Page Details ##################################

// ########################### Start Consts ##################################
const router = useRouter();
const isOpen = ref(false);
const progressMessage = ref("");
const keyword = ref({
  name: "",
  //   meta_keywords: "",
  slug: "",
  IsActive: false,
});
// ########################### End Consts ##################################

// ########################### Start Rmove Spaces And Set (-) Func  ##################################

const convertDescriptionToSlug = (description) => {
  return description.trim().replace(/\s+/g, "-");
};
// ########################### End Rmove Spaces And Set (-) Func  ##################################

// ########################### Start Watch To Set Old Slug Value  ##################################
watch(
  () => keyword.value.keyword,
  (newDescription) => {
    keyword.value.slug = convertDescriptionToSlug(newDescription);
  }
);
// ########################### End Watch To Set Old Slug Value  ##################################

// ########################### Start ShoW Alert Func  ##################################

const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpen.value = false;
      resolve();
    }, 2000);
  });
};
// ########################### End ShoW Alert Func  ##################################

// ######################### Start Add Keyword Request ###############################
async function addKeyword() {
  try {
    const dataToSend = {
      ...keyword.value,
      isActive: keyword.value.IsActive ? 1 : 0,
    };

    const res = await useNuxtApp().$axios.post("Addkeyword", dataToSend);
    progressMessage.value = res.data.message;
    isOpen.value = true;
    setTimeout(() => {
      router.push("/keywords");
    }, 2000);
    keyword.value = {
      keyword: "",
      description: "",
      slug: "",
      IsActive: false,
    };
  } catch (res) {
    isOpen.value = true;
    progressMessage.value =
      res.response.data.message || "هناك خطأ في السيرفر يرجى المحاولة لاحقا";
  } finally {
    await showAlert();
  }
}
// ######################### End Add Keyword Request ###############################
</script>
