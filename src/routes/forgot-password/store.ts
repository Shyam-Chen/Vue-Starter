import { reactive } from 'vue';
import { defineStore } from 'vue-storer';

export default defineStore('/forgot-password', () => {
  const state = reactive({
    form: {
      email: '',
    },
    valdn: {} as Record<string, string>,
  });

  return { state };
});
