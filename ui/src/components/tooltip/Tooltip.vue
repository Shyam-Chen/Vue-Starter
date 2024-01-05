<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';

defineProps<{
  title?: string;
}>();

const target = ref();
const tip = ref();

const flux = reactive({
  status: false,
  timeout: undefined as ReturnType<typeof setTimeout> | undefined,
  onMouseenter() {
    flux.status = true;
    clearTimeout(flux.timeout);

    nextTick(() => {
      const rect = target.value.getBoundingClientRect();

      const center = window.innerHeight / 2;

      tip.value.style.left = `${rect.x}px`;
      tip.value.style.top = `${rect.y}px`;

      const xAxis = `calc(${rect.width / 2}px - 50%)`;

      if (rect.top > center) {
        const yAxis = `calc(-100% - 0.25rem)`;
        tip.value.style.transform = `translate(${xAxis}, ${yAxis})`;
      } else {
        const yAxis = `calc(${rect.height}px + 0.25rem)`;
        tip.value.style.transform = `translate(${xAxis}, ${yAxis})`;
      }
    });
  },
  onMouseleave() {
    flux.timeout = setTimeout(() => {
      flux.status = false;
    }, 50);
  },
});
</script>

<template>
  <div class="relative inline-flex" @mouseleave="flux.onMouseleave">
    <div ref="target" class="inline-flex" @mouseenter="flux.onMouseenter">
      <slot></slot>
    </div>

    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="flux.status" ref="tip" class="fixed z-101 top-0 left-0" tabindex="-1">
        <div class="bg-slate-500 text-slate-100 px-3 py-1 rounded text-sm">{{ title }}</div>
      </div>
    </Transition>
  </div>
</template>
