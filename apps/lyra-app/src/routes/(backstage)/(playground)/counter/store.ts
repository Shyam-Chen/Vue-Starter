import { computed, reactive, readonly } from 'vue';
import { defineStore } from 'pinia';

export const useCounter = defineStore('counter', () => {
  const state = reactive({
    name: 'My Counter',
    count: 0,
  });

  const getters = readonly({
    doubleCount: computed(() => state.count * 2),
  });

  const actions = readonly({
    increment() {
      state.count += 1;
    },
  });
  function $reset() {
    state.name = 'My Counter';
    state.count = 0;
  }
  return { state, getters, actions, $reset };
});
