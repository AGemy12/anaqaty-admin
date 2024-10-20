<template>
  <section>
    <PagesHeader title="قائمة الموضوعات" />
    <Button title="إضافة موضوع" :fire-click="goToAddTagPage" />

    <v-table class="overflow-auto md:w-screen">
      <thead class="">
        <tr class="text-center">
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            #
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            العنوان
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            القسم
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            المشاهدات
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            حالة النشر
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
        <template v-if="!loading">
          <tr
            class="cursor-pointer text-center duration-300 hover:bg-alt"
            v-for="(item, index) in topicsData"
            :key="item.id"
            @click="goToEditPage(item.id, index)"
          >
            <td class="text-[12px] md:text-[15px] whitespace-nowrap">
              {{ topicsData.length - index }}
            </td>
            <td class="text-[12px] md:text-[15px] whitespace-nowrap">
              {{ item.title }}
            </td>
            <td class="text-[12px] md:text-[15px] whitespace-nowrap">
              {{ item.category?.name }}
            </td>
            <td class="text-[12px] md:text-[15px] whitespace-nowrap">
              {{ item.views_count }}
            </td>
            <td class="text-[12px] md:text-[15px] whitespace-nowrap">
              <span
                class="bg-[green] text-[11px] md:text-[14px] p-[0.2rem] rounded-sm text-white"
                v-if="item.status === 'published'"
                >تم النشر</span
              >
              <span
                class="bg-[gray] text-[11px] md:text-[14px] p-[0.2rem] rounded-sm text-white"
                v-else
              >
                مسودة
              </span>
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
                @click="handleDeletTopic(item.id, $event)"
              >
                <Icon
                  name="ic:baseline-delete-outline"
                  class="text-[20px] md:text-[25px]"
                />
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
    <AlertModel :is-opend="isOpen" :title="deletedMessage" />
    <AnaqatyModel
      message-title="هل أنت متأكد من أنك تريد حذف الموضوع ؟"
      :model-opend="modeldIsOpend"
      :fire-clcik-yes="deleteTopic"
      :fire-clcik-no="cancleDeletePremissionHandel"
    />
  </section>
</template>

<script setup>
// ##################### Start Imports ############################
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Button from "~/components/mini/Button.vue";
import AlertModel from "~/components/mini/AlertModel.vue";
import AnaqatyModel from "~/components/mini/AnaqatyModel.vue";
// ##################### End Imports ############################

// ##################### Start Auth And Head Page Details #########################
useHead({
  title: "Anaqaty | قائمة الموضوعات",
});
// ##################### End Auth And Head Page Details #########################

// ##################### Start Consts ###################################
const router = useRouter();
const loading = ref(true);
const isOpen = ref(false);
const showDeleteSuccAlert = ref(false);
const modeldIsOpend = ref(false);
const topicIdToDelete = ref(null);
const deletedMessage = ref("");
const progressMessage = ref("");
const topicsData = ref({
  id: "",
  title: "",
  slug: "",
  content: "",
  summary: "",
  views_count: "",
  IsActive: "",
  updated_at: "",
  status: "",
  category: {},
});

// ##################### End Consts ###################################

// ########################### Start ShoW Alert Func  ##################################

const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpen.value = false;
      showDeleteSuccAlert.value = false;
      resolve();
    }, 2000);
  });
};
// ########################### End ShoW Alert Func  ##################################

// ##################### Start Get Topics Request ######################
async function getTopics() {
  try {
    const res = await useNuxtApp().$axios.get("articles");
    if (res.status >= 200) {
      topicsData.value = res.data.articles;
      loading.value = false;
    }
  } catch (res) {
    isOpen.value = true;
    progressMessage.value = res.response.data.message;
    await showAlert();
  }
}
// ##################### End Get Topics Request ######################

// ###################################### Start  Delete User Request ###################################
const handleDeletTopic = (id, event) => {
  event.stopPropagation();
  topicIdToDelete.value = id;
  modeldIsOpend.value = true;
};

const cancleDeletePremissionHandel = () => {
  modeldIsOpend.value = false;
};

const deleteTopic = async () => {
  if (topicIdToDelete.value) {
    try {
      const res = await useNuxtApp().$axios.delete(
        `DeleteArticle/${topicIdToDelete.value}`
      );
      await getTopics();
      modeldIsOpend.value = false;
      deletedMessage.value = res.data.message;
      isOpen.value = true;
      await showAlert();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};

// ###################################### End   Delete User Request ###################################

const goToAddTagPage = () => {
  router.push("/add-topic");
};

const goToEditPage = (id, index) => {
  router.push(`/topics/${id}?index=${index}`);
};

onMounted(() => {
  getTopics();
});
</script>
