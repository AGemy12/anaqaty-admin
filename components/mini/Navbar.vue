<template>
  <ul class="my-[2rem]">
    <li class="overflow-hidden" v-for="link in mainNavLinks" :key="link.id">
      <button
        @click="toggleItem(link.id)"
        :class="`p-3 flex justify-between items-center w-full duration-300 hover:bg-white rounded-md cursor-pointer ${
          openItem[link.id] ? 'bg-white' : null
        } `"
      >
        <div class="flex justify-start items-center gap-2">
          <Icon :name="link.mainIcon" class="text-[1.5rem]" />
          <span> {{ link.mainTitle }} </span>
        </div>
        <Icon
          :name="link.arrowIcon"
          :class="`text-[1.5rem] duration-500 ${
            openItem[link.id] ? '-rotate-90' : null
          } `"
        />
      </button>
      <ul
        class="mx-[1rem] my-[0.5rem] transition-all duration-500 overflow-hidden"
        :style="{ maxHeight: openItem[link.id] ? '200px' : '0' }"
      >
        <li class="mb-2" v-for="item in link.nestedNavLinks" :key="item.id">
          <a
            href="##"
            class="p-3 text-[15px] duration-300 hover:bg-[rgba(255,255,255,0.6)] flex items-center justify-start gap-1"
          >
            <Icon :name="item.addIcon" class="text-[1.2rem] shrink-0" />
            <span> {{ item.title }} </span>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { useNavStore } from "@/stores/navbarStore";

const navStore = useNavStore();

const { openItem, toggleItem } = navStore;

const mainNavLinks = ref([
  {
    id: 1,
    mainTitle: "الموضوعات",
    mainIcon: "mdi:newspaper",
    arrowIcon: "material-symbols:keyboard-arrow-left",
    nestedNavLinks: [
      {
        id: 1,
        title: "إضافة موضوع",
        addIcon: "material-symbols:add",
      },
      {
        id: 2,
        title: "قائمة الموضوعات",
        addIcon: "mdi:newspaper",
      },
    ],
  },
  {
    id: 2,
    mainTitle: "الكلمات المفتاحية",
    mainIcon: "oui:token-keyword",
    arrowIcon: "material-symbols:keyboard-arrow-left",
    nestedNavLinks: [
      {
        id: 1,
        title: "إضافة",
        addIcon: "material-symbols:add",
      },
      {
        id: 2,
        title: "الكلمات المفتاحية",
        addIcon: "oui:token-keyword",
      },
    ],
  },
]);
</script>
