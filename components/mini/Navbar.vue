<template>
  <ul class="my-[2rem]">
    <li
      class="overflow-hidden mb-[1rem]"
      v-for="link in mainNavLinks"
      :key="link.id"
    >
      <button
        @click="toggleItem(link.id)"
        :class="`p-3 flex justify-between items-center w-full duration-300 hover:bg-alt rounded-md cursor-pointer ${
          openItem[link.id] ? 'bg-alt' : null
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
        class="mx-[1rem] transition-all duration-500 overflow-hidden"
        :style="{ maxHeight: openItem[link.id] ? '200px' : '0' }"
      >
        <li class="my-2" v-for="item in link.nestedNavLinks" :key="item.id">
          <nuxt-link
            :href="item.path"
            class="p-3 text-[15px] duration-300 hover:bg-alt flex items-center justify-start gap-1"
          >
            <Icon :name="item.addIcon" class="text-[1.2rem] shrink-0" />
            <span> {{ item.title }} </span>
          </nuxt-link>
        </li>
      </ul>
    </li>

    <li class="overflow-hidden mb-[1rem]">
      <nuxt-link
        to="/categories"
        class="p-3 flex justify-between items-center w-full duration-300 hover:bg-alt rounded-md cursor-pointer"
      >
        <div class="flex justify-start items-center gap-2">
          <Icon
            name="material-symbols:category-search-outline"
            class="text-[1.5rem]"
          />
          <span> الأقسام </span>
        </div>
      </nuxt-link>
    </li>

    <li class="overflow-hidden mb-[1rem]">
      <nuxt-link
        to="/users"
        class="p-3 flex justify-between items-center w-full duration-300 hover:bg-alt rounded-md cursor-pointer"
      >
        <div class="flex justify-start items-center gap-2">
          <Icon name="mage:users-fill" class="text-[1.5rem]" />
          <span> المستخدمين </span>
        </div>
      </nuxt-link>
    </li>

    <li class="overflow-hidden mb-[1rem]">
      <nuxt-link
        to="/login"
        class="p-3 flex justify-between items-center w-full duration-300 hover:bg-alt rounded-md cursor-pointer"
      >
        <div class="flex justify-start items-center gap-2">
          <Icon name="material-symbols:logout" class="text-[1.5rem]" />
          <span> تسجيل الخروج </span>
        </div>
      </nuxt-link>
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
    mainIcon: "material-symbols:news-outline-rounded",
    arrowIcon: "material-symbols:keyboard-arrow-left",
    nestedNavLinks: [
      {
        id: 1,
        title: "إضافة موضوع",
        addIcon: "material-symbols:add",
        path: "/add-topic",
      },
      {
        id: 2,
        title: "قائمة الموضوعات",
        addIcon: "material-symbols:news-outline-rounded",
        path: "##",
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
        path: "##",
      },
      {
        id: 2,
        title: "الكلمات المفتاحية",
        addIcon: "oui:token-keyword",
        path: "##",
      },
    ],
  },
]);
</script>
