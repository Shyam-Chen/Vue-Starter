<script lang="ts" setup>
import { useNotification, XAlert, XButton } from '@x/ui';
import type { ComponentProps } from 'vue-component-type-helpers';

const notification = useNotification();

type Color = ComponentProps<typeof XAlert>['color'];

const colorSelector = (() => {
  const colors: Color[] = ['success', 'danger', 'warning', 'info'];

  let currentIndex = 0;

  return () => {
    const currentColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
    return currentColor;
  };
})();

let count = 0;

const push = () => {
  count += 1;

  notification.actions.add({
    message: `This is a test notification. (${count})`,
    color: colorSelector(),
  });
};
</script>

<template>
  <XButton @click="push">Push</XButton>
</template>
