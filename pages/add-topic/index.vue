<template>
  <section>
    <PagesHeader title="إضافة موضوع" />
    <v-sheet class="mx-auto bg-transparent w-full md:w-3/4">
      <v-form @submit.prevent>
        <v-text-field
          label="العنوان"
          v-model="title"
          class="mb-8"
        ></v-text-field>
        <v-select class="mb-8" label="الفئة" :items="category"></v-select>

        <v-autocomplete
          class="mb-8"
          label="الأوسمة"
          :items="tags"
          v-model="selectedTags"
          multiple
          chips
          clearable
          hide-selected
          :filter="searchTags"
          placeholder="ابحث عن وسوم..."
        ></v-autocomplete>

        <v-file-input label="اختر صورة" class="mb-4"></v-file-input>

        <div class="mb-8" id="editor"></div>

        <v-btn
          class="!bg-black text-white !duration-300 hover:bg-black !tracking-[0]"
          type="submit"
          block
        >
          إضافة موضوع
        </v-btn>
      </v-form>
    </v-sheet>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import "quill/dist/quill.snow.css"; // تأكد من استيراد CSS
import PagesHeader from "~/components/mini/PagesHeader.vue";

const title = ref("");
const selectedTags = ref<string[]>([]);
const category = ["موضة", "جمال", "صحة نفسية"];
const tags = ["تقنية", "صحة", "تغذية", "تسويق", "موسيقى"];

const searchTags = (item: string, queryText: string) => {
  return item.toLowerCase().includes(queryText.toLowerCase());
};

onMounted(async () => {
  if (process.client) {
    const Quill = (await import("quill")).default;
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["link", "image"],

      [{ direction: "rtl" }], // text direction
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],

      ["clean"], // remove formatting button
    ];

    const quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
  }
});
</script>

<style>
.v-text-field .v-input__details {
  display: none !important;
}
#editor {
  height: 400px;
  width: 100%;
}
</style>
