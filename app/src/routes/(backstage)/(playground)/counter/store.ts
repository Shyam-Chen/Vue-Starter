import { computed, reactive } from 'vue';
import { defineStore } from 'vue-storer';

export const useCounter = defineStore('counter', () => {
  const state = reactive({
    name: 'My Counter',
    count: 0,
  });

  const getters = reactive({
    doubleCount: computed(() => state.count * 2),
  });

  const actions = reactive({
    increment() {
      state.count += 1;
    },
  });

  return { state, getters, actions };
});
