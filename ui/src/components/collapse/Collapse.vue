<script lang="ts" setup>
const onEnter = (element: Element) => {
  const el = element as HTMLElement;

  const width = getComputedStyle(el).width;

  el.style.width = width;
  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.height = 'auto';

  const height = getComputedStyle(el).height;

  el.style.width = '';
  el.style.position = '';
  el.style.visibility = '';
  el.style.height = '0px';

  requestAnimationFrame(() => {
    el.style.height = height;
  });
};

const onAfterEnter = (element: Element) => {
  const el = element as HTMLElement;
  el.style.height = 'auto';
};

const onLeave = (element: Element) => {
  const el = element as HTMLElement;

  const height = getComputedStyle(el).height;

  el.style.height = height;

  requestAnimationFrame(() => {
    el.style.height = '0px';
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
