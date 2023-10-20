import { reactive, readonly } from 'vue';
import { defineStore } from 'vue-storer';

import type Alert from '~/components/Alert.vue';

type NotificationMessage = {
  message: string;
  timeout: ReturnType<typeof setTimeout>;
  color?: InstanceType<typeof Alert>['color'];
  icon?: InstanceType<typeof Alert>['icon'];
};

type State = {
  messages: NotificationMessage[];
  timeouts: NotificationMessage[];
};

type Actions = {
  add(params: Omit<NotificationMessage, 'timeout'>): void;
};

export default defineStore<State, object, Actions>('useNotification', () => {
  const state = reactive<State>({
    messages: [],
    timeouts: [],
  });

  const actions = readonly<Actions>({
    add({ message, color, icon }) {
      const item = {
        message,
        timeout: setTimeout(() => {
          state.timeouts.push(item);
        }, 3000),
        color,
        icon,
      };

      state.messages.push(item);
    },
  });

  return { state, actions };
});
