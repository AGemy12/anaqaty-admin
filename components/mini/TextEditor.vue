<template>
  <div class="mb-8" id="editor"></div>
</template>

<script setup>
import { ref, onMounted, defineEmits, watch, nextTick } from "vue";
import "quill/dist/quill.snow.css";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["topicBody"]);
const topicBody = ref(null);
const isEditorReady = ref(false); // للتحقق من أن المحرر جاهز

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

    // استخدام nextTick لضمان أن DOM تم تحميله بالكامل قبل إعداد المحرر
    await nextTick();

    // تهيئة المحرر
    topicBody.value = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });

    isEditorReady.value = true; // تغيير حالة جاهزية المحرر

    // الاستماع لتغير النص في المحرر
    topicBody.value.on("text-change", () => {
      const content = topicBody.value.root.innerHTML;
      emit("topicBody", content);
    });
  }
});

// مراقبة التغير في props.content وضمان أن المحرر جاهز قبل تعيين المحتوى
watch(
  () => props.content,
  async (newContent) => {
    if (isEditorReady.value && topicBody.value) {
      // تأخير تعيين المحتوى حتى يصبح المحرر جاهزًا
      await nextTick();
      topicBody.value.clipboard.dangerouslyPasteHTML(newContent);
    }
  }
);
</script>
