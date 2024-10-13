<template>
  <section>
    <PagesHeader title="تحديث وسم" />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent="fetchUpdateTag">
        <v-text-field
          v-model="tag.name"
          label="العنوان"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          v-model="tag.slug"
          label="الشكل في الرابط"
          class="mb-4"
        ></v-text-field>
        <v-switch
          v-model="tag.IsActive"
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
  title: "Anaqaty | تحديث وسم",
});
// ########################### End Auth And Head Page Details ##################################

// ########################### Start Consts ##################################
const router = useRouter();
const route = useRoute();
const isOpen = ref(false);
const progressMessage = ref("");
const tag = ref({
  name: "",
  slug: "",
  IsActive: false,
});
// ########################### End Consts ##################################

// ########################### Start Rmove Spaces And Set (-) Func  ##################################

const convertTagToSlug = (name) => {
  return name.trim().replace(/\s+/g, "-");
};
// ########################### End Rmove Spaces And Set (-) Func  ##################################

// ########################### Start Watch To Set Old Slug Value  ##################################
watch(
  () => tag.value.name,
  (newTag) => {
    tag.value.slug = convertTagToSlug(newTag);
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
async function fetchGetTags() {
  try {
    const res = await useNuxtApp().$axios.get(`tags`);
    const index = route.query.index;

    if (res.data.Tags && res.data.Tags[index]) {
      tag.value = res.data.Tags[index];
      tag.value.IsActive = tag.value.IsActive === 1;
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
async function fetchUpdateTag() {
  try {
    const index = route.query.index;
    const id = route.params.id;
    // console.log(id);

    const dataToSend = {
      ...tag.value,
      IsActive: tag.value.IsActive ? 1 : 0,
    };

    const res = await useNuxtApp().$axios.put(`Updatetag/${id}`, dataToSend, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    progressMessage.value = res.data.message;
    isOpen.value = true;

    setTimeout(() => {
      router.push("/tags");
      route.params = "";
      window.location.reload();
    }, 2000);
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ أثناء تحديث الوسم ";
    isOpen.value = true;
  } finally {
    await showAlert();
  }
}
// ######################### End Update Keyword Request ############################

onMounted(() => {
  fetchGetTags();
});
</script>
