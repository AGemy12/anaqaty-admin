import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loading: false, // حالة التحميل الافتراضية
  }),
  actions: {
    setLoading(status) {
      this.loading = status;
    },
  },
});
