<script lang="ts" setup>
import { nextTick, ref, computed, reactive } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

import Fade from '../fade/Fade.vue';

const props = defineProps<{
  modelValue?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
}>();

const model = computed({
  get: () => props.modelValue || false,
  set: (val) => emit('update:modelValue', val),
});

const target = ref();
const panel = ref();

const flux = reactive({
  status: false,
  toggle() {
    if (props.disabled) return;

    flux.status = !flux.status;
    model.value = !model.value;

    if (!flux.status && !model.value) return;

    nextTick(() => {
      const rect = target.value.getBoundingClientRect();

      const center = window.innerHeight / 2;

      if (panel.value) {
        panel.value.style.left = `${rect.x}px`;
        panel.value.style.top = `${rect.y}px`;

        const xAxis = `calc(${rect.width / 2}px - 50%)`;

        if (rect.top > center) {
          const yAxis = `calc(-100% - 0.25rem)`;
          panel.value.style.transform = `translate(${xAxis}, ${yAxis})`;
        } else {
          const yAxis = `calc(${rect.height}px + 0.25rem)`;
          panel.value.style.transform = `translate(${xAxis}, ${yAxis})`;
        }
      }
    });
  },
  close() {
    flux.status = false;
    model.value = false;
  },
});
</script>

<template>
  <div v-on-click-outside="flux.close" class="relative inline-flex">
    <div
      ref="target"
      class="inline-flex w-full justify-center items-center rounded-md"
      @click="flux.toggle"
    >
      <slot></slot>
    </div>

    <Fade>
      <div
        v-if="flux.status || model"
        ref="panel"
        class="fixed z-100 top-0 left-0 min-w-max bg-white dark:bg-slate-800 rounded-lg shadow-lg"
        tabindex="-1"
      >
        <div class="py-1">
          <slot name="content"> </slot>
        </div>
      </div>
    </Fade>
  </div>
</template>
