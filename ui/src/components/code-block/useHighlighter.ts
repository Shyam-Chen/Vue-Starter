import type { HighlighterCore } from 'shiki/core';
import { reactive } from 'vue';
import { defineStore } from 'vue-storer';

interface State {
  core?: HighlighterCore;
}

export default defineStore('useHighlighter', () => {
  const state = reactive<State>({
    core: undefined,
  });

  const getters = reactive({});

  const actions = reactive({});

  return { state, getters, actions };
});
