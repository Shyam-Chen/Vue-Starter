import { defineStore } from 'pinia';
import Alert from '../../components/alert/Alert.vue';

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

export default defineStore({
  id: 'notification',
  state: (): State => ({
    messages: [],
    timeouts: [],
  }),
  actions: {
    add({ message, color, icon }: Omit<NotificationMessage, 'timeout'>) {
      const item = {
        message,
        timeout: setTimeout(() => {
          this.timeouts.push(item);
        }, 3000),
        color,
        icon,
      };

      this.messages.push(item);
    },
  },
});
