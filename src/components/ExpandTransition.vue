<script lang="ts" setup>
const onEnter = (element: HTMLElement) => {
  const width = getComputedStyle(element).width;

  element.style.width = width;
  element.style.position = 'absolute';
  element.style.visibility = 'hidden';
  element.style.height = 'auto';

  const height = getComputedStyle(element).height;

  element.style.width = '';
  element.style.position = '';
  element.style.visibility = '';
  element.style.height = '0px';

  getComputedStyle(element).height;

  requestAnimationFrame(() => {
    element.style.height = height;
  });
};

const onAfterEnter = (element: HTMLElement) => {
  element.style.height = 'auto';
};

const onLeave = (element: HTMLElement) => {
  const height = getComputedStyle(element).height;

  element.style.height = height;

  getComputedStyle(element).height;

  requestAnimationFrame(() => {
    element.style.height = '0px';
  });
};
</script>

<template>
  <Transition name="expand" @enter="onEnter" @afterEnter="onAfterEnter" @leave="onLeave">
    <slot></slot>
  </Transition>
</template>

<style lang="scss" scoped>
.expand-enter-active,
.expand-leave-active {
  transition: block-size 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  block-size: 0;
}
</style>
