<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';

import Alert from '../alert/Alert.vue';

type NotificationMessage = {
  message: string;
  timeout: ReturnType<typeof setTimeout> | number;
  color?: InstanceType<typeof Alert>['color'];
  icon?: InstanceType<typeof Alert>['icon'];
};

const props = defineProps<{
  messages?: NotificationMessage[];
  timeouts?: NotificationMessage[];
  color?: InstanceType<typeof Alert>['color'];
  icon?: InstanceType<typeof Alert>['icon'];
}>();

const list = ref(props.messages || []);
const timeoutList = ref(props.timeouts || []);

const severityIcon = new Map();
severityIcon.set('success', 'i-material-symbols-check-circle-rounded');
severityIcon.set('danger', 'i-material-symbols-dangerous-rounded');
severityIcon.set('warning', 'i-material-symbols-warning-rounded');
severityIcon.set('info', 'i-material-symbols-info-rounded');

const push = ({ message, color, icon }: Omit<NotificationMessage, 'timeout'>) => {
  const item = {
    message,
    timeout: setTimeout(() => {
      timeoutList.value.push(item);
    }, 3000),
    color,
    icon,
  };

  list.value.push(item);
};

watch(
  () => timeoutList.value,
  (arr) => {
    if (arr.length) {
      timeoutList.value.splice(0, 1);

      nextTick(() => {
        list.value.splice(0, 1);
      });
    }
  },
  { deep: true },
);

function close(item: NotificationMessage, index: number) {
  clearTimeout(item.timeout);
  item.timeout = -1;
  list.value.splice(index, 1);
}

defineExpose({
  push,
});
</script>

<template>
  <TransitionGroup
    tag="div"
    name="list"
    class="grid gap-4 fixed left-1/2 top-12 -translate-x-1/2 z-200 w-full px-4 md:w-auto md:min-w-xs"
  >
    <Alert
      v-for="(item, index) in list"
      :key="item.timeout as number"
      v-bind="$attrs"
      :color="color || item.color"
      :icon="icon || item.icon || severityIcon.get(item.color)"
      class="shadow-xl dark:shadow-primary-500/50"
      :class="{
        '!dark:shadow-secondary-500/50': color === 'secondary' || item.color === 'secondary',
        '!dark:shadow-success-500/50': color === 'success' || item.color === 'success',
        '!dark:shadow-danger-500/50': color === 'danger' || item.color === 'danger',
        '!dark:shadow-warning-500/50': color === 'warning' || item.color === 'warning',
        '!dark:shadow-info-500/50': color === 'info' || item.color === 'info',
      }"
      @close="close(item, index)"
    >
      {{ item.message }}
    </Alert>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
