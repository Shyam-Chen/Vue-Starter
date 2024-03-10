import { defineStore } from 'pinia';
import { reactive } from 'vue';

export default defineStore('/forgot-password', () => {
  const state = reactive({
    form: {
      email: '',
    },
    valdn: {} as Record<string, string>,
  });

  function $reset() {
    state.form.email = '';
    state.valdn = {};
  }
  return { state, $reset};
});
