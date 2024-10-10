<template>
  <section>
    <PagesHeader title="تحديث تصنيف" />
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
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import qs from "qs"; // استيراد مكتبة qs لتحويل الكائنات إلى x-www-form-urlencoded
import AlertModel from "~/components/mini/AlertModel.vue";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

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

// دالة لجلب بيانات الفئة
async function fetchCategory() {
  try {
    const response = await useNuxtApp().$axios.get(`categories`); // جلب جميع الفئات
    const index = route.query.index; // الحصول على الفهرس من الاستعلام

    // تعيين الفئة بناءً على الفهرس
    if (response.data.categories && response.data.categories[index]) {
      category.value = response.data.categories[index];

      category.value.IsActive = category.value.IsActive === 1;
    }
  } catch (error) {
    console.error("خطأ في جلب الفئة:", error);
  }
}

// استرجاع البيانات عند تحميل الصفحة
onMounted(async () => {
  await fetchCategory(); // احصل على بيانات الفئة
});

async function fetchUpdateCategory() {
  try {
    const index = route.query.index;
    const id = route.params.id;
    console.log(id);

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
      isOpen.value = false;
      router.push("/categories");
      route.params = "";
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("خطأ في تحديث الفئة:", error);
    progressMessage.value = "حدث خطأ أثناء تحديث الفئة";
    isOpen.value = true;
  }
}
</script>
