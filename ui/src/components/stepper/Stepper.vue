<script lang="ts" setup>
import { computed, provide, ref, useSlots } from 'vue';
import { useLocale } from 'vue-localer';

import Card from '../card/Card.vue';
import ProgressCircle from '../progress-circle/ProgressCircle.vue';

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    completed?: string;
  }>(),
  {
    modelValue: 0,
    completed: '',
  },
);

defineEmits<(evt: 'update:modelValue', val: number) => void>();

const slots = useSlots();
const locale = useLocale();

const body = ref<HTMLDivElement>();

provide('Stepper', {
  modelValue: computed(() => props.modelValue),
  body,
});
</script>

<template>
  <div class="flex w-full">
    <Card class="w-full mt-10">
      <nav
        class="stepper relative z-3 -top-16 -mb-16 p-4 bg-white dark:bg-slate-700 rounded-md shadow-md border border-gray-200 dark:border-gray-700"
      >
        <ul class="hidden md:flex justify-between">
          <slot name="head"></slot>
        </ul>

        <div class="flex justify-center items-center md:hidden">
          <template v-if="modelValue <= Number(slots.head?.()?.length)">
            <ProgressCircle :percentage="(modelValue / Number(slots.head?.()?.length)) * 100">
              {{ modelValue }}/{{ slots.head?.()?.length }}
            </ProgressCircle>
            <slot name="head"></slot>
          </template>

          <template v-else>
            <ProgressCircle :percentage="100">
              {{ modelValue - 1 }}/{{ slots.head?.()?.length }}
            </ProgressCircle>

            <span
              class="text-success-500 dark:text-success-400 flex flex-col items-center flex-1 p-3"
              >{{ completed || locale.completed || 'Completed!' }}</span
            >
          </template>
        </div>
      </nav>

      <div ref="body" class="pt-6">
        <slot name="body"></slot>
      </div>
    </Card>
  </div>
</template>
