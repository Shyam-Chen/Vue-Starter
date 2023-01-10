<script lang="ts" setup>
import { reactive } from 'vue';

defineProps<{ title?: string }>();

const flux = reactive({
  status: false,
  onMouseenter() {
    flux.status = true;
  },
  onMouseleave() {
    flux.status = false;
  },
});
</script>

<template>
  <div class="relative inline-flex">
    <div class="inline-flex" @mouseenter="flux.onMouseenter" @mouseleave="flux.onMouseleave">
      <slot></slot>
    </div>

    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="flux.status"
        class="absolute top-4 left-1/2 transform -translate-x-1/2 translate-y-1/2"
      >
        <div class="bg-slate-600 text-slate-100 px-3 py-1 rounded text-sm">{{ title }}</div>
      </div>
    </Transition>
  </div>
</template>
