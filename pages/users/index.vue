<template>
  <section>
    <PagesHeader title="المستخدمين" />
    <Button title="إضافة مستخدم" :fire-click="goToAddUsersPage" />
    <v-table>
      <thead>
        <tr>
          <th class="text-right text-[12px] md:text-[18px] whitespace-nowrap">
            #
          </th>
          <th class="text-right text-[12px] md:text-[18px] whitespace-nowrap">
            الإسم
          </th>
          <th class="text-right text-[12px] md:text-[18px] whitespace-nowrap">
            البريد الإلكتروني
          </th>
          <th class="text-right text-[12px] md:text-[18px] whitespace-nowrap">
            تم الإنشاء في
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="cursor-pointer duration-300 hover:bg-alt"
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
        </tr>
      </tbody>
    </v-table>
  </section>
</template>

<script setup>
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
