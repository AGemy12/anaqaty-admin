<template>
  <div class="mb-8" id="editor"></div>
</template>

<script setup>
import { ref, onMounted, defineEmits, nextTick, onBeforeUnmount } from "vue";
import "quill/dist/quill.snow.css";
import { debounce } from "lodash";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["topicBody"]);
const topicBody = ref(null);
const isEditorReady = ref(false);
let observer = null;

const emitContent = debounce(() => {
  if (topicBody.value) {
    const content = topicBody.value.root.innerHTML;
    emit("topicBody", content); // إرسال المحتوى للأب
  }
}, 300);

onMounted(async () => {
  if (process.client) {
    const Quill = (await import("quill")).default;

    const SizeStyle = Quill.import("attributors/style/size");
    SizeStyle.whitelist = [
      "12px",
      "14px",
      "16px",
      "18px",
      "24px",
      "32px",
      "40px",
    ];
    Quill.register(SizeStyle, true);

    const handleImageUpload = async () => {
      try {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const image = input.files[0];
          const formData = new FormData();
          formData.append("image", image);

          const res = await useNuxtApp().$axios.post("uploadImage", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const ImageUrl = res.data.ImageUrl;

          if (ImageUrl) {
            const range = topicBody.value.getSelection();
            topicBody.value.insertEmbed(range.index, "image", ImageUrl);
          } else {
            console.error("Failed to upload image or get image URL");
          }
        };
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };

    const toolbarOptions = [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ direction: "rtl" }],
      [{ align: [] }],
      [{ size: ["12px", "14px", "16px", "18px", "24px", "32px", "40px"] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      ["clean"],
    ];

    await nextTick();

    topicBody.value = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });

    const toolbar = topicBody.value.getModule("toolbar");
    toolbar.addHandler("image", handleImageUpload);

    isEditorReady.value = true;

    const targetNode = document.getElementById("editor");
    observer = new MutationObserver(() => {
      emitContent(); // إرسال المحتوى بعد التعديلات
    });
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // متابعة تغييرات النص
    topicBody.value.on("text-change", () => {
      emitContent(); // إرسال المحتوى المحدث
    });
  }
});

watch(
  () => props.content,
  async (newContent, oldContent) => {
    if (newContent !== oldContent && isEditorReady.value && topicBody.value) {
      await nextTick();

      // تحديث المحتوى فقط إذا كان مختلفًا عن الحالي
      if (topicBody.value.root.innerHTML !== newContent) {
        topicBody.value.clipboard.dangerouslyPasteHTML(newContent); // تحديث المحتوى
      }
    }
  }
);

onBeforeUnmount(() => {
  if (topicBody.value) {
    topicBody.value.off("text-change");
    topicBody.value.off("selection-change");
  }
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style>
.ql-snow .ql-picker.ql-size .ql-picker-label::before {
  content: attr(data-value);
  text-transform: none;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=""]::before {
  content: "16px";
}
.ql-toolbar.ql-snow .ql-picker-label {
  padding: 0 3px;
}
.ql-snow .ql-picker.ql-header {
  width: fit-content;
  margin: 0 auto;
}
.ql-toolbar.ql-snow .ql-picker-label {
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.4);
}
.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
  display: none;
}

.ql-picker-item[data-value="12px"]::before {
  content: "12px" !important;
}
.ql-picker-item[data-value="14px"]::before {
  content: "14px" !important;
}
.ql-picker-item[data-value="16px"]::before {
  content: "16px" !important;
}
.ql-picker-item[data-value="18px"]::before {
  content: "18px" !important;
}
.ql-picker-item[data-value="24px"]::before {
  content: "24px" !important;
}
.ql-picker-item[data-value="32px"]::before {
  content: "32px" !important;
}
.ql-picker-item[data-value="40px"]::before {
  content: "40px" !important;
}
.ql-editor {
  direction: rtl;
  text-align: right;
}
</style>
