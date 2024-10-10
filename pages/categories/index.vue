<template>
  <section>
    <PagesHeader title="الفئات" />
    <Button title="إضافة فئة" :fire-click="goToAddUsersPage" />
    <v-table class="overflow-auto md:w-screen">
      <thead>
        <tr class="text-center">
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            #
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            العنوان
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            عدد مرات الاستخدام
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            حالة التفعيل
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            اخر تحديث
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            خيارات
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="cursor-default text-center duration-300 hover:bg-alt"
          v-for="(item, index) in categoriesData"
          :key="item.id"
        >
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.id }}
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.name }}
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.useCounts }}
          </td>
          <td class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            <span
              class="bg-[green] text-[11px] md:text-[14px] p-[0.2rem] rounded-sm text-white"
              v-if="item.IsActive == 1"
              >مفعل</span
            >
            <span
              class="bg-[red] text-[11px] md:text-[14px] p-[0.2rem] rounded-sm text-white"
              v-else
              >غير مفعل</span
            >
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.updated_at }}
          </td>
          <td
            class="text-[12px] md:text-[15px] whitespace-nowrap flex items-center justify-center"
          >
            <button
              class="mx-2 flex items-center justify-center"
              @click="goToEditPage(item.id, index)"
            >
              <Icon
                name="material-symbols:edit-square-rounded"
                class="text-[20px] md:text-[25px]"
              />
            </button>
            <button
              class="flex items-center justify-center"
              @click="confirmDeleteCategory(item.id)"
            >
              <Icon
                name="ic:baseline-delete-outline"
                class="text-[20px] md:text-[25px]"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </v-table>
    <AnaqatyModel
      message-title="هل أنت متأكد من أنك تريد حذف هذه الفئة؟"
      :model-opend="modeldIsOpend"
      :fire-clcik-yes="deleteCategory"
      :fire-clcik-no="cancleDeletePremissionHandel"
    />
  </section>
</template>

<script setup>
import Button from "~/components/mini/Button.vue";
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AnaqatyModel from "~/components/mini/AnaqatyModel.vue";
definePageMeta({
  middleware: "auth",
});

const router = useRouter();
const categoriesData = ref([]);
const modeldIsOpend = ref(false);
let categoryIdToDelete = ref(null); // لحفظ المعرف الذي نريد حذفه

async function handleLogin() {
  try {
    const response = await useNuxtApp().$axios.get("categories");
    categoriesData.value = response.data.categories;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  handleLogin();
});

const goToAddUsersPage = () => {
  router.push("/add-category");
};

const goToEditPage = (id, index) => {
  router.push(`/categories/${id}?index=${index}`);
};
// تأكيد حذف الفئة
const confirmDeleteCategory = (id) => {
  categoryIdToDelete.value = id;
  modeldIsOpend.value = true;
};

const cancleDeletePremissionHandel = () => {
  modeldIsOpend.value = false;
};

const deleteCategory = async () => {
  if (categoryIdToDelete.value) {
    try {
      await useNuxtApp().$axios.delete(
        `DeleteCategory/${categoryIdToDelete.value}`
      );
      await handleLogin();
      modeldIsOpend.value = false; // إغلاق النموذج
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
};
</script>
