<template>
  <section>
    <PagesHeader title=" قائمة ادوار المستخدمين" />
    <Button title="إضافة دور" :fire-click="goToAddRolePage" />

    <v-table class="overflow-auto md:w-screen">
      <thead class="">
        <tr class="text-center">
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            #
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            الدور
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
          v-for="(item, index) in rolesData"
          :key="item.id"
        >
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.id }}
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.title }}
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.updated_at }}
          </td>
          <td
            class="text-[12px] md:text-[15px] whitespace-nowrap flex items-center justify-center"
          >
            <button
              class="mx-2 flex items-center justify-center"
              @click="goToEditRole(item.id, index)"
            >
              <Icon
                name="material-symbols:edit-square-rounded"
                class="text-[20px] md:text-[25px]"
              />
            </button>
            <button
              class="flex items-center justify-center"
              @click="confirmDeleteRole(item.id)"
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
      message-title="هل أنت متأكد من أنك تريد حذف هذه الدور ؟"
      :model-opend="modeldIsOpend"
      :fire-clcik-yes="deleteRole"
      :fire-clcik-no="cancleDeletePremissionHandel"
    />
    <AlertModel :title="progressMessage" :is-opend="isOpend" />
  </section>
</template>

<script setup>
// ##################### Start Imports ###############################
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Button from "~/components/mini/Button.vue";
import AnaqatyModel from "~/components/mini/AnaqatyModel.vue";
import AlertModel from "~/components/mini/AlertModel.vue";
// ##################### End Imports ###############################

// ##################### Start Auth And Head Page Details ###############################
useHead({
  title: "Anaqaty | ادوار المستخدمين",
});
definePageMeta({
  layout: "default",
  middleware: "auth",
});
// ##################### End Auth And Head Page Details ###############################

// ##################### Start Consts ###############################
const router = useRouter();
const rolesData = ref([]);
const roleIdToDelete = ref(null);
const modeldIsOpend = ref(false);
const isOpend = ref(false);
const progressMessage = ref("");
// ##################### Start Consts ###############################

// ##################### Start Alert Model ###############################
const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpend.value = false;
      resolve();
    }, 2000);
  });
};
// ##################### End Alert Model ###############################

// ##################### Start Get Roles Request ###############################
async function fetchGetRoles() {
  try {
    const response = await useNuxtApp().$axios.get("roles");
    rolesData.value = response.data.roles;
  } catch (error) {
    console.error(error);
  }
}

const goToEditRole = (id, index) => {
  router.push(`/users/roles/${id}?index=${index}`);
};

const confirmDeleteRole = (id) => {
  roleIdToDelete.value = id;
  modeldIsOpend.value = true;
};

const cancleDeletePremissionHandel = () => {
  modeldIsOpend.value = false;
};

const deleteRole = async () => {
  if (roleIdToDelete.value) {
    try {
      const res = await useNuxtApp().$axios.delete(
        `DeleteRole/${roleIdToDelete.value}`
      );
      await fetchGetRoles();
      modeldIsOpend.value = false;
      progressMessage.value = res.data.message;
      isOpend.value = true;
    } catch (res) {
      progressMessage.value = res.response.data.message;
      isOpend.value = true;
    } finally {
      await showAlert();
    }
  }
};
// ##################### Start Get Roles Request ###############################

const goToAddRolePage = () => {
  router.push("/add-role");
};

onMounted(() => {
  fetchGetRoles();
});
</script>
