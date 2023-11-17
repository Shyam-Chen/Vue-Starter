<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { ref } from 'vue';
import { XBreadcrumb, XButton, XNotification } from '@x/ui';
import { useNotification } from '@x/ui';

const notify = ref();

let count = 0;

const push = () => {
  count += 1;
  notify.value.push({ message: `This is a test notification. (${count})` });
};

const notify2 = ref();

let count2 = 0;

const push2 = () => {
  count2 += 1;
  notify2.value.push({ message: `This is a test notification. (${count2})` });
};

let count3 = 0;

const notification = useNotification();

type Color = ComponentProps<typeof XNotification>['color'];

const colorSelector = (() => {
  const colors: Color[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

  let currentIndex = 0;

  return () => {
    const currentColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
    return currentColor;
  };
})();

const push3 = () => {
  count3 += 1;

  notification.actions.add({
    message: `This is a test notification. (${count3})`,
    color: colorSelector(),
  });
};
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Notification' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Notification</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex gap-4">
      <XButton @click="push">Push</XButton>
      <XNotification ref="notify" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Multiple</div>

    <div class="flex gap-4">
      <XButton @click="push2">Push</XButton>
      <XNotification ref="notify2" color="success" icon="i-mdi-checkbox-marked-circle-outline" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">useNotification</div>

    <div class="flex gap-4">
      <XButton @click="push3">Push</XButton>
    </div>
  </div>
</template>
