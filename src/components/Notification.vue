<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';

import Alert from './Alert.vue';

const props = defineProps<{
  messages?: any[];
  timeouts?: any[];
}>();

const list = ref<any[]>(props.messages || []);
const timeoutList = ref<any[]>(props.timeouts || []);

const push = ({ message }: { message: string }) => {
  const item = {
    message,
    timeout: setTimeout(() => {
      timeoutList.value.push(item);
    }, 3000),
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
    <Alert v-for="item in list" :key="item.timeout" v-bind="$attrs" class="shadow-xl">
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
