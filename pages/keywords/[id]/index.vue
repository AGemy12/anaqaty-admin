<template>
  <section>
    <PagesHeader title="تحديث كلمة مفتاحية " />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent="fetchUpdateKeyword">
        <v-text-field
          v-model="keyword.keyword"
          label="العنوان"
          class="mb-4"
        ></v-text-field>
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
          تحديث
        </v-btn>
      </v-form>
    </v-sheet>
    <AlertModel :is-opend="isOpen" :title="progressMessage" />
  </section>
</template>

<script setup>
// ########################### Start imports ##################################
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, watch, onMounted } from "vue";
import AlertModel from "~/components/mini/AlertModel.vue";
import { useRouter, useRoute } from "vue-router";

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
const route = useRoute();
const isOpen = ref(false);
const progressMessage = ref("");
const keyword = ref({
  keyword: "",
  slug: "",
  IsActive: false,
});
// ########################### End Consts ##################################

// ########################### Start Rmove Spaces And Set (-) Func  ##################################

const convertKeywordToSlug = (keyword) => {
  return keyword.trim().replace(/\s+/g, "-");
};
// ########################### End Rmove Spaces And Set (-) Func  ##################################

// ########################### Start Watch To Set Old Slug Value  ##################################
watch(
  () => keyword.value.keyword,
  (newKeyword) => {
    keyword.value.slug = convertKeywordToSlug(newKeyword);
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

// ######################### Start Get Keywords Request ###############################
async function fetchGetKeyword() {
  try {
    const res = await useNuxtApp().$axios.get(`keywords`);
    const index = route.query.index;

    if (res.data.keywords && res.data.keywords[index]) {
      keyword.value = res.data.keywords[index];
      keyword.value.IsActive = keyword.value.IsActive === 1;
    }
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ في السيرفر يرجى المحاولة لاحقا";
    isOpen.value = true;
    await showAlert();
  }
}
// ######################### End Add Keyword Request ###############################

// ######################### Start Update Keyword Request ############################
async function fetchUpdateKeyword() {
  try {
    const index = route.query.index;
    const id = route.params.id;
    // console.log(id);

    const dataToSend = {
      ...keyword.value,
      IsActive: keyword.value.IsActive ? 1 : 0,
    };

    const res = await useNuxtApp().$axios.put(
      `Updatekeyword/${id}`,
      dataToSend,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    progressMessage.value = res.data.message;
    isOpen.value = true;

    setTimeout(() => {
      router.push("/keywords");
      route.params = "";
      window.location.reload();
    }, 2000);
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ أثناء تحديث الكلمة المفتاحية";
    isOpen.value = true;
  } finally {
    await showAlert();
  }
}
// ######################### End Update Keyword Request ############################

onMounted(() => {
  fetchGetKeyword();
});
</script>
