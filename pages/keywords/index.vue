<template>
  <section>
    <PagesHeader title="الكلمات المفتاحية" />
    <Button title="إضافة كلمة مفتاحية" :fire-click="goToAddKeywordPage" />
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
          v-for="(item, index) in keywordsData"
          :key="item.id"
        >
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.id }}
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.keyword }}
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.usage_count }}
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
              @click="confirmDeleteKeyword(item.id)"
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
      message-title="هل أنت متأكد من أنك تريد حذف هذه الكملة المفتاحية ؟"
      :model-opend="modeldIsOpend"
      :fire-clcik-yes="deleteKeyword"
      :fire-clcik-no="cancleDeletePremissionHandel"
    />
    <AlertModel :is-opend="isOpen" :title="progressMessage" />
  </section>
</template>

<script setup>
// ###################### Start Imports ########################
import Button from "~/components/mini/Button.vue";
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AnaqatyModel from "~/components/mini/AnaqatyModel.vue";
import AlertModel from "~/components/mini/AlertModel.vue";
// ###################### End Imports ########################

// ###################### Start Auth And Head Page Details ########################
definePageMeta({
  middleware: "auth",
});
useHead({
  title: "Anaqaty | الكلمات المفتاحية",
});
// ###################### End Auth And Head Page Details ########################

// ###################### Start Consts ########################
const router = useRouter();
const keywordsData = ref([]);
const modeldIsOpend = ref(false);
let keywordIdToDelete = ref(null);
const isOpen = ref(false);
const progressMessage = ref("");
// ###################### End Consts ########################

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

// ###################### Start Get Keyword Request ########################
async function fetchGetKeywords() {
  try {
    const res = await useNuxtApp().$axios.get("keywords");
    if (res.status >= 200) {
      keywordsData.value = res.data.keywords;
    }
  } catch (error) {
    isOpen.value = true;
    progressMessage.value = "حدث خطأ اثناء تحميل البيانات يرجى المحاولة لاحقا";
    await showAlert();
  }
}
// ###################### Start Get Keyword Request ########################

const goToAddKeywordPage = () => {
  router.push("/add-keyword");
};

const goToEditPage = (id, index) => {
  router.push(`/keywords/${id}?index=${index}`);
};

// ###################### Start Delete Keyword Funs ########################
const confirmDeleteKeyword = (id) => {
  keywordIdToDelete.value = id;
  modeldIsOpend.value = true;
};

const cancleDeletePremissionHandel = () => {
  modeldIsOpend.value = false;
};

const deleteKeyword = async () => {
  if (keywordIdToDelete.value) {
    try {
      const res = await useNuxtApp().$axios.delete(
        `Deletekeyword/${keywordIdToDelete.value}`
      );
      await fetchGetKeywords();
      modeldIsOpend.value = false;
      isOpen.value = true;
      progressMessage.value = res.data.message;
      await showAlert();
    } catch (res) {
      progressMessage.value = res.response.data.message;
    }
  }
};
// ###################### End Delete Keyword Funs ########################

onMounted(() => {
  fetchGetKeywords();
});
</script>
