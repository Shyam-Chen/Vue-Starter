<script lang="ts" setup>
const onEnter = (element: any) => {
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

  requestAnimationFrame(() => {
    element.style.height = height;
  });
};

const onAfterEnter = (element: any) => {
  element.style.height = 'auto';
};

const onLeave = (element: any) => {
  const height = getComputedStyle(element).height;

  element.style.height = height;

  requestAnimationFrame(() => {
    element.style.height = '0px';
  });
};
</script>

<template>
  <Transition name="collapse" @enter="onEnter" @afterEnter="onAfterEnter" @leave="onLeave">
    <slot></slot>
  </Transition>
</template>

<style lang="scss" scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: block-size 0.3s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  block-size: 0;
}
</style>
