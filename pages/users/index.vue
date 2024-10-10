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
            تم الإنشاء في
          </th>
          <th class="text-center text-[12px] md:text-[18px] whitespace-nowrap">
            خيارات
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="cursor-pointer duration-300 hover:bg-alt text-center"
          v-for="item in users"
          :key="item.name"
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
            {{ item.date }}
          </td>
          <td
            class="text-[12px] md:text-[15px] whitespace-nowrap flex items-center justify-center"
          >
            <button class="mx-2 flex items-center justify-center">
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
// Start <====> Auth Check <====>
definePageMeta({
  middleware: "auth",
});
useHead({
  title: "Anaqaty | المستخدمين",
});
// End <====> Auth Check <====>
import Button from "~/components/mini/Button.vue";
import { useRouter } from "vue-router";
import PagesHeader from "~/components/mini/PagesHeader.vue";

const router = useRouter();

const users = [
  {
    id: 1,
    name: "Ahmad Gamal",
    email: "aggamal98@gmail.com",
    date: "10/05/2024",
  },
];

const goToAddUsersPage = () => {
  router.push("users/new");
};
</script>
