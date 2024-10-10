<template>
  <section>
    <PagesHeader title="قائمة الموضوعات" />
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
          v-for="item in topicsData"
          :key="item.id"
        >
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.id }}
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.title }}
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.category }}
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.views }}
          </td>
          <td class="text-[12px] md:text-[15px] whitespace-nowrap">
            {{ item.lastUpdate }}
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

<script setup lang="ts">
import PagesHeader from "~/components/mini/PagesHeader.vue";

const topicsData = [
  {
    id: 1,
    title: "خبير إقتصادي تركي عن توقعاته",
    category: "موضه",
    views: 220,
    lastUpdate: "30/9/2024 || 01:25:03",
  },
  {
    id: 2,
    title: "خبير إقتصادي تركي عن توقعاته",
    category: "موضه",
    views: 220,
    lastUpdate: "30/9/2024 || 01:25:03",
  },
  {
    id: 3,
    title: "خبير إقتصادي تركي عن توقعاته",
    category: "موضه",
    views: 220,
    lastUpdate: "30/9/2024 || 01:25:03",
  },
  {
    id: 4,
    title: "خبير إقتصادي تركي عن توقعاته",
    category: "موضه",
    views: 220,
    lastUpdate: "30/9/2024 || 01:25:03",
  },
];
</script>
