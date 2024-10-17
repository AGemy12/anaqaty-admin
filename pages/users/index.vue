<template>
  <section class="max-w-full">
    <PagesHeader title="المستخدمين" />
    <Button title="إضافة مستخدم" :fire-click="goToAddUsersPage" />
    <v-table class="overflow-auto md:w-screen">
      <thead class="">
        <tr>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            #
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            الإسم
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            البريد الإلكتروني
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            دور المستخدم
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
            class="cursor-pointer duration-300 hover:bg-alt text-center"
            v-for="(item, index) in usersData"
            :key="item.name"
            @click="goToEditPage(item.id, index)"
          >
            <td class="text-[12px] md:text-[15px] whitespace-nowrap">
              {{ item.id }}
            </td>
            <td class="text-[12px] md:text-[15px] whitespace-nowrap">
              {{ item.name }}
            </td>
            <td class="text-[12px] md:text-[15px] whitespace-nowrap">
              {{ item.email }}
            </td>
            <td class="text-[12px] md:text-[15px] whitespace-nowrap">
              <span v-for="(role, index) in item.roles">
                {{ role.title }}
                <span v-if="index !== item.roles.length - 1"> - </span>
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
                @click="handelDeletUser(item.id, $event)"
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
    <AlertModel :is-opend="modelOpend" :title="deletedMessage" />
    <AnaqatyModel
      message-title="هل أنت متأكد من أنك تريد حذف  المستخدم ؟"
      :model-opend="modeldIsOpend"
      :fire-clcik-yes="deleteUser"
      :fire-clcik-no="cancleDeletePremissionHandel"
    />
  </section>
</template>

<script setup>
// ###################################### Start Imports #################################
import Button from "~/components/mini/Button.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import PagesHeader from "~/components/mini/PagesHeader.vue";
import AnaqatyModel from "~/components/mini/AnaqatyModel.vue";
import AlertModel from "~/components/mini/AlertModel.vue";
// ###################################### End Imports #################################

// ###################################### Start Auth And Head Page Details #################################
definePageMeta({
  middleware: "auth",
});
useHead({
  title: "Anaqaty | المستخدمين",
});
// ###################################### End Auth And Head Page Details #################################

// ###################################### Start Consts #################################
const router = useRouter();
const loading = ref(true);
const usersData = ref([]);
const userIdToDelete = ref(null);
const modeldIsOpend = ref(false);
const deletedMessage = ref("");
const modelOpend = ref(false);
// ###################################### End Consts #################################

// ###################################### Start Show Alert Func #################################
const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      modelOpend.value = false;
      resolve();
    }, 2000);
  });
};
// ###################################### End Show Alert Func #################################

// ###################################### Start Get Users Request #################################
async function fetchGetUsers() {
  try {
    const res = await useNuxtApp().$axios.get("users");

    if (res.status >= 200) {
      usersData.value = res.data.users;
      // console.log(usersData.value);
      loading.value = false;
    } else {
      console.error("خطأ في تسجيل الدخول:", response.data.message);
    }
  } catch (error) {}
}

// ###################################### End  Get Users Request ###################################

// ###################################### Start  Delete User Request ###################################
const handelDeletUser = (id, event) => {
  event.stopPropagation();
  userIdToDelete.value = id;
  modeldIsOpend.value = true;
};

const cancleDeletePremissionHandel = () => {
  modeldIsOpend.value = false;
};

const deleteUser = async () => {
  if (userIdToDelete.value) {
    try {
      const res = await useNuxtApp().$axios.delete(
        `DeleteUser/${userIdToDelete.value}`
      );
      await fetchGetUsers();
      modeldIsOpend.value = false;
      deletedMessage.value = res.data.message;
      modelOpend.value = true;
      await showAlert();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};

// ###################################### End   Delete User Request ###################################
const goToEditPage = (id, index) => {
  router.push(`/users/${id}?index=${index}`);
};

const goToAddUsersPage = () => {
  router.push("/add-user");
};

onMounted(() => {
  fetchGetUsers();
});
</script>
