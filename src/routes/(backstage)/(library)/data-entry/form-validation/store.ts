import { reactive, readonly } from 'vue';
import { defineStore } from 'vue-storer';

import type { State } from './types';

export default defineStore('/(library)/data-entry/form-validation', () => {
  const state = reactive<State>({
    zodForm: {},
    zodValdn: {},
  });

  const actions = readonly({
    async submit() {
      console.log('zodForm =', state.zodForm);
    },
  });

  return { state, actions };
});
