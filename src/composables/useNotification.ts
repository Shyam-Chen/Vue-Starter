import { reactive, readonly } from 'vue';

import { defineStore } from 'vue-storer';

type NotificationMessage = {
  message: string;
  timeout: ReturnType<typeof setTimeout>;
};

export default defineStore('useNotification', () => {
  const state = reactive({
    messages: [] as NotificationMessage[],
    timeouts: [] as NotificationMessage[],
  });

  const actions = readonly({
    add({ message }: { message: string }) {
      const item = {
        message,
        timeout: setTimeout(() => {
          state.timeouts.push(item);
        }, 3000),
      };

      state.messages.push(item);
    },
  });

  return { state, actions };
});
