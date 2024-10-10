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
    <!-- <AlertModel :is-opend="isOpen" :title="progressMessage" /> -->
  </section>
</template>

<script setup>
useHead({
  title: "Anaqaty | تحديث فئة",
});
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// import AlertModel from "~/components/mini/AlertModel.vue";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

const role = ref({
  title: "",
});
const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const progressMessage = ref("");

async function fetchRole() {
  try {
    const response = await useNuxtApp().$axios.get(`roles`);
    const index = route.query.index;

    if (response.data.roles && response.data.roles[index]) {
      role.value = response.data.roles[index];
    }
  } catch (error) {
    console.error("خطأ في جلب الفئة:", error);
  }
}

onMounted(async () => {
  await fetchRole();
});

async function fetchUpdateRole() {
  try {
    const id = route.params.id;
    console.log(id);

    const dataToSend = {
      ...category.value,
    };
    const formData = qs.stringify(dataToSend);
    console.log(dataToSend);

    await useNuxtApp().$axios.put(`UpdateRole/${id}`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    progressMessage.value = "تم تحديث الدور بنجاح";
    isOpen.value = true;

    setTimeout(() => {
      isOpen.value = false;
      router.push("/users/roles");
      route.params = "";
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("خطأ في تحديث الدور:", error);
    progressMessage.value = "حدث خطأ أثناء تحديث الدور";
    isOpen.value = true;
  }
}
</script>
