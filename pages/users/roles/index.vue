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
            <button class="flex items-center justify-center">
              <Icon
                name="ic:baseline-delete-outline"
                class="text-[20px] md:text-[25px]"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </v-table>
  </section>
</template>

<script setup>
useHead({
  title: "Anaqaty | ادوار المستخدمين",
});
import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Button from "~/components/mini/Button.vue";

const router = useRouter();
const rolesData = ref([]);

async function getRolesData() {
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

const goToAddRolePage = () => {
  router.push("/add-role");
};

onMounted(() => {
  getRolesData();
});
</script>
