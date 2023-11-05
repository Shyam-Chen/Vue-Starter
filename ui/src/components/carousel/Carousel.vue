<script lang="ts" setup>
import type { UseSwipeDirection } from '@vueuse/core';
import { ref, useSlots, toRef } from 'vue';
import { useSwipe, usePointerSwipe } from '@vueuse/core';

import Button from '../button/Button.vue';

const props = defineProps<{
  move?: number;
}>();

const moveRef = toRef(props, 'move', 100);

const slots = useSlots();
const defaultSlot = slots.default?.();
const length = Number(defaultSlot?.[0]?.children?.length);

const left = ref(0);
const target = ref<HTMLDivElement>();

function previous() {
  if (left.value === 0) return;
  left.value += moveRef.value;
}

function next() {
  if (left.value === -moveRef.value * (length - 1)) return;
  left.value -= moveRef.value;
}

function goTo(num: number) {
  left.value = -moveRef.value * (num - 1);
}

useSwipe(target, {
  onSwipeEnd(evt: TouchEvent, dir: UseSwipeDirection) {
    if (dir === 'left') next();
    if (dir === 'right') previous();
  },
});

usePointerSwipe(target, {
  onSwipeEnd(evt: PointerEvent, dir: UseSwipeDirection) {
    if (evt.pointerType === 'touch') return;

    if (dir === 'left') next();
    if (dir === 'right') previous();
  },
});
</script>

<template>
  <div ref="target" class="relative rounded-lg overflow-hidden">
    <div class="relative w-full h-full transition-all duration-500" :style="{ left: `${left}%` }">
      <slot></slot>
    </div>

    <div class="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex space-x-1 text-primary-500">
      <template v-for="num in length" :key="num">
        <div
          class="cursor-pointer"
          :class="[
            left === -moveRef * (num - 1)
              ? 'i-mdi-checkbox-blank-circle'
              : 'i-mdi-checkbox-blank-circle-outline',
          ]"
          @click="goTo(num)"
        ></div>
      </template>
    </div>

    <Button
      icon="i-mdi-chevron-left"
      class="absolute top-1/2 left-3 z-10 -translate-y-1/2"
      :disabled="left === 0"
      @click="previous"
    />
    <Button
      icon="i-mdi-chevron-right"
      class="absolute top-1/2 right-3 z-10 -translate-y-1/2"
      :disabled="left === -moveRef * (length - 1)"
      @click="next"
    />
  </div>
</template>
