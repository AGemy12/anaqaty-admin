<template>
  <section>
    <PagesHeader title="تعديل موضوع" />
    <v-sheet class="mx-auto bg-transparent w-full md:w-1/2">
      <v-form @submit.prevent>
        <v-text-field
          v-model="topicData.title"
          label="العنوان"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          v-model="topicData.slug"
          label="العنوان في الرابط"
          class="mb-4"
        ></v-text-field>
        <v-autocomplete
          label="الفئة"
          :items="categories"
          v-model="selectedCategoryId"
          item-title="name"
          item-value="id"
          class="mb-3"
        ></v-autocomplete>
        <v-autocomplete
          label="الكلمات المفتاحية"
          :items="keywords"
          v-model="selectedKeywordId"
          item-title="keyword"
          item-value="id"
          class="mb-3"
          multiple
        ></v-autocomplete>
        <v-autocomplete
          label="الاوسمة"
          :items="tagsData"
          v-model="selectedTagId"
          item-value="id"
          item-title="name"
          class="mb-3"
          multiple
        ></v-autocomplete>
        <v-file-input
          accept="image/*"
          label="الصورة الرئيسية"
          v-model="topicData.image"
        ></v-file-input>
        <TextEditor
          :content="topicData.content"
          @topic-body="handleTopicBody"
        />
        <v-textarea label="الملخص" v-model="topicData.summary"></v-textarea>
        <v-switch
          v-model="topicData.IsActive"
          label="تفعيل"
          color="primary"
        ></v-switch>

        <div
          class="flex items-center justify-center gap-4 max-w-[250px] mx-auto"
        >
          <Button
            :fire-click="handleUpdateAndPublishTopic"
            title="تعديل ونشر"
            addStyle="text-[15px] md:text-[16px] bg-black"
          />
          <Button
            :fire-click="handleUpdateAndDraftedTopic"
            title=" تعديل وحفظ"
            addStyle="text-[15px] md:text-[16px] "
          />
        </div>
      </v-form>
    </v-sheet>
    <AlertModel :is-opend="isOpen" :title="progressMessage" />
  </section>
</template>

<script setup>
// #################################### Start Imports  #################################

import PagesHeader from "~/components/mini/PagesHeader.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AlertModel from "~/components/mini/AlertModel.vue";
import Button from "~/components/mini/Button.vue";
import TextEditor from "~/components/mini/TextEditor.vue";
// #################################### End Imports  #################################

// #################################### Start Auth And Head Page Details #################################
definePageMeta({
  layout: "default",
  middleware: "auth",
});
useHead({
  title: "Anaqaty | تعديل موضوع",
});
// #################################### End Auth And Head Page Details #################################

// ######################### End Consts ############################
const router = useRouter();
const route = useRoute();
const tagsData = ref([]);
const categories = ref([]);
const keywords = ref([]);
const selectedTagId = ref([]);
const selectedCategoryId = ref("");
const selectedKeywordId = ref([]);
const progressMessage = ref("");
const isOpen = ref(false);
const topicData = ref({
  title: "",
  slug: "",
  content: "",
  summary: "",
  category_id: "",
  keywords: "",
  image: null,
  tags: "",
  IsActive: false,
});
// ######################### End Consts ############################

// #################################### Start Show Alert Model #################################
const showAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isOpen.value = false;
      resolve();
    }, 2000);
  });
};

//################################## End Show Alert Model ###################################

// ########################### Start Rmove Spaces And Set (-) Func  ##################################

const convertTitleToSlug = (title) => {
  return title.trim().replace(/\s+/g, "-");
};
// ########################### End Rmove Spaces And Set (-) Func  ##################################

// ###################################### Start Watch Selected Roles ################################
watch(
  [
    selectedTagId,
    selectedKeywordId,
    selectedCategoryId,
    () => topicData.value.title,
  ],
  ([newTagId, newKeywordId, newCategoryId, newSlugTitle]) => {
    const selectedTags = tagsData.value.filter((tag) =>
      newTagId.includes(tag.id)
    );
    topicData.value.tags = selectedTags.map((tag) => tag.id);
    // console.log("Selected Tag IDs:", topicData.value.tags);

    const selectedKeywords = keywords.value.filter((keyword) =>
      newKeywordId.includes(keyword.id)
    );
    topicData.value.keywords = selectedKeywords.map((keyword) => keyword.id);
    // console.log("Selected Keyword IDs:", topicData.value.keywords);

    const selectedCategory = categories.value.find(
      (category) => category.id === newCategoryId
    );
    topicData.value.category_id = selectedCategory ? selectedCategory.id : null;
    // console.log("Selected Category ID:", topicData.value.category_id);

    topicData.value.slug = convertTitleToSlug(newSlugTitle);
  }
);
// ###################################### End Watch Selected Roles ################################

// ###################################### Strt Get All Data Request ################################
async function getAllData() {
  try {
    const [tagsRes, keywordsRes, categoriesReq] = await Promise.all([
      useNuxtApp().$axios.get("tags"),
      useNuxtApp().$axios.get("keywords"),
      useNuxtApp().$axios.get("categories"),
    ]);

    tagsData.value = tagsRes.data.tags;
    // console.log("TagesData =======>", tagsData.value);

    keywords.value = keywordsRes.data.keywords;
    categories.value = categoriesReq.data.categories;
  } catch (tagsRes) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ في السيرفر يرجى المحاولة لاخقا";
    isOpen.value = true;
    await showAlert();
  }
}
// ###################################### End Get All Data Request ################################

// ###################################### Start Get All Roles Request ###########################

async function getTopics() {
  try {
    const res = await useNuxtApp().$axios.get(`articles`);
    const index = route.query.index;

    if (res.status >= 200) {
      topicData.value = res.data.articles[index];
      selectedCategoryId.value = res.data.articles[index].category.id;
      // selectedKeywordId.value = res.data.articles[index].keywords.map(
      //   (item) => item.id
      // );
      // selectedTagId.value = res.data.articles[index].tags.map(
      //   (item) => item.id
      // );

      console.log(selectedCategoryId, selectedKeywordId, selectedTagId);
    }
  } catch (error) {
    console.error("خطأ في جلب الفئة:", error);
  }
}
// ###################################### End Get All Roles Request ############################

// ###################################### Start Recive Topic Content ################################
const handleTopicBody = (content) => {
  topicData.value.content = content;
};
// ###################################### End Recive Topic Content ################################

// ###################################### Start Add New User Request ##################################

async function handleUpdateAndPublishTopic() {
  try {
    const id = route.params.id;

    const formData = new FormData();
    formData.append("title", topicData.value.title);
    formData.append("slug", topicData.value.slug);
    formData.append("content", topicData.value.content);
    formData.append("summary", topicData.value.summary);
    formData.append("category_id", selectedCategoryId.value);
    console.log("هذا البتاع  ===>", selectedCategoryId.value);

    const isActiveValue = topicData.value.IsActive ? 1 : 0;
    formData.append("IsActive", isActiveValue);

    selectedKeywordId.value.forEach((keywordId) => {
      formData.append("keywords[]", keywordId);
    });

    selectedTagId.value.forEach((tagId) => {
      formData.append("tags[]", tagId);
      console.log(selectedTagId);
    });

    if (topicData.value.image) {
      formData.append("image", topicData.value.image);
    }

    const res = await useNuxtApp().$axios.post(
      `UpdateAndPublish/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (res.status === 200) {
      progressMessage.value = res.data.message;
      isOpen.value = true;
      setTimeout(() => {
        router.push("/topics");
      }, 2000);
    }
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ في السيرفر يرجى المحاولة لاخقا";
    isOpen.value = true;
  } finally {
    await showAlert();
  }
}

async function handleUpdateAndDraftedTopic() {
  try {
    const id = route.params.id;

    const formData = new FormData();
    formData.append("title", topicData.value.title);
    formData.append("slug", topicData.value.slug);
    formData.append("content", topicData.value.content);
    formData.append("summary", topicData.value.summary);
    formData.append("category_id", selectedCategoryId.value);
    console.log(selectedCategoryId.value);

    const isActiveValue = topicData.value.IsActive ? 1 : 0;
    formData.append("IsActive", isActiveValue);

    selectedKeywordId.value.forEach((keywordId) => {
      formData.append("keywords[]", keywordId);
    });

    selectedTagId.value.forEach((tagId) => {
      formData.append("tags[]", tagId);
    });

    // إرسال الصورة إذا كانت موجودة
    if (topicData.value.image) {
      formData.append("image", topicData.value.image);
    }

    const res = await useNuxtApp().$axios.post(
      `UpdateAndDraft/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(formData);
    if (res.status === 200) {
      progressMessage.value = res.data.message;
      isOpen.value = true;
      setTimeout(() => {
        router.push("/topics");
      }, 2000);
    }
  } catch (res) {
    progressMessage.value =
      res.response.data.message || "حدث خطأ في السيرفر يرجى المحاولة لاخقا";
    isOpen.value = true;
  } finally {
    await showAlert();
  }
}

// ###################################### End Add New User Request ##################################=

onMounted(async () => {
  await getAllData();
  await getTopics();
});

// ###################################### End Update User Request ===============================
</script>
