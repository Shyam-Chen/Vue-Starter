<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';
import { useTimeoutFn } from '@vueuse/core';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';
import Alert from '~/components/Alert.vue';

const show = ref(false);

const { start, stop } = useTimeoutFn(
  () => {
    show.value = false;
  },
  3000,
  { immediate: false },
);

const open = () => {
  show.value = !show.value;
  start();
};

let count = 0;

const list = ref<any[]>([]);
const timeoutList = ref<any[]>([]);

const push = () => {
  count += 1;

  const item = {
    message: `This is a test notification. (${count})`,
    timeout: setTimeout(() => {
      timeoutList.value.push(item);
    }, 3000),
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
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Notification' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Notification</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex gap-4">
      <Button @click="open">Open</Button>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Queue</div>

    <div class="flex gap-4">
      <Button @click="push">Push</Button>
    </div>
  </div>

  <TransitionGroup
    tag="div"
    name="list"
    class="grid gap-4 fixed left-1/2 top-12 -translate-x-1/2 z-200"
  >
    <Alert
      v-for="item in list"
      :key="item.timeout"
      color="success"
      icon="i-mdi-checkbox-marked-circle-outline"
      class="shadow-xl"
    >
      {{ item.message }}
    </Alert>
  </TransitionGroup>

  <Transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-show="show"
      class="fixed left-1/2 top-12 -translate-x-1/2 z-200"
      @mouseenter="stop()"
      @mouseleave="start()"
    >
      <Alert color="info" icon="i-mdi-information" class="shadow-xl">
        This is a test notification.
      </Alert>
    </div>
  </Transition>
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
