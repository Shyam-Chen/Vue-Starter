<script lang="ts" setup>
import { ref } from 'vue';
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

const list = ref<string[]>([]);
const toasts = ref([]);

const push = () => {
  const notifications = [
    { message: 'This is a test notification. (1)', timeout: null, show: false },
    { message: 'This is a test notification. (2)', timeout: null, show: false },
    { message: 'This is a test notification. (3)', timeout: null, show: false },
  ];

  console.log(notifications);

  list.value.push('This is a test notification.');
};
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Feedback', disabled: true },
      { text: 'Notification', disabled: true },
    ]"
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
    name="fade"
    class="grid gap-4 fixed left-1/2 top-12 -translate-x-1/2 z-200"
  >
    <div v-for="(item, index) in list" :key="index">
      <Alert
        ref="toasts"
        color="success"
        icon="i-mdi-checkbox-marked-circle-outline"
        class="shadow-xl"
      >
        {{ item }}
      </Alert>
    </div>
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
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
