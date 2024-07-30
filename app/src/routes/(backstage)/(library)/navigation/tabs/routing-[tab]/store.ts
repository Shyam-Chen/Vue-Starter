import { reactive } from 'vue';
import { defineStore } from 'vue-storer';

export default defineStore('/navigation/tabs/routing-:tab', () => {
  const state = reactive({
    currentTab: 0,
  });

  const getters = reactive({});

  const actions = reactive({});

  return { state, getters, actions };
});
