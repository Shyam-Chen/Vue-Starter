<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';

import Alert from './Alert.vue';

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

defineExpose({
  push,
});

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
</script>

<template>
  <TransitionGroup
    tag="div"
    name="list"
    class="grid gap-4 fixed left-1/2 top-12 -translate-x-1/2 z-200"
  >
    <Alert
      v-for="item in list"
      :key="item.timeout as number"
      v-bind="$attrs"
      :color="color || item.color"
      :icon="icon || item.icon"
      class="shadow-xl"
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
