import type { ComponentProps } from 'vue-component-type-helpers';
import { reactive } from 'vue';
import { defineStore } from 'vue-storer';

import type Toast from '../../components/notification/Toast.vue';

type State = {
  messages: ComponentProps<typeof Toast>[];
};

type Actions = {
  add(params: ComponentProps<typeof Toast>): void;
};

export default defineStore<State, {}, Actions>('useNotification', () => {
  const state = reactive<State>({
    messages: [],
  });

  const actions = reactive<Actions>({
    add(params) {
      state.messages.push(params);
    },
  });

  return { state, actions };
});
