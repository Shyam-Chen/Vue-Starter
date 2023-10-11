import { reactive, readonly } from 'vue';
import { defineStore } from 'vue-storer';

type NotificationMessage = {
  message: string;
  timeout: ReturnType<typeof setTimeout>;
};

type State = {
  messages: NotificationMessage[];
  timeouts: NotificationMessage[];
};

type Actions = {
  add(params: Pick<NotificationMessage, 'message'>): void;
};

export default defineStore<State, object, Actions>('useNotification', () => {
  const state = reactive<State>({
    messages: [],
    timeouts: [],
  });

  const actions = readonly<Actions>({
    add({ message }) {
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
