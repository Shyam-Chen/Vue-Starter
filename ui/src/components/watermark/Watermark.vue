<script lang="ts" setup>
import { ref, watchEffect, useTemplateRef } from 'vue';

withDefaults(
  defineProps<{
    content?: string;
  }>(),
  {
    content: '',
  },
);

const container = useTemplateRef('container');
const total = ref(0);

watchEffect(() => {
  if (container?.value) {
    const text = 30.66;
    const gap = 64;
    const target = container.value.clientHeight;

    const y = Math.round((target - text) / (text + gap));
    const x = y + 1;

    total.value = x * 3;
  }
});
</script>

<template>
  <div class="relative w-full h-full">
    <div
      class="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <div
        class="-rotate-15 opacity-30 z-1 pointer-events-none grid grid-cols-3 gap-16 w-full h-full"
      >
        <div v-for="num in total" :key="num" class="text-xl font-medium text-center">
          {{ content }}
        </div>
      </div>
    </div>

    <div ref="container" class="relative z-10">
      <slot></slot>
    </div>
  </div>
</template>
