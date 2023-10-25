<script lang="ts" setup>
import { ref, computed, provide } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: number;
  }>(),
  {
    modelValue: 0,
  },
);

defineEmits<{
  (evt: 'update:modelValue', val: number): void;
}>();

const body = ref<HTMLDivElement>();

provide('Stepper', {
  modelValue: computed(() => props.modelValue),
  body,
});
</script>

<template>
  <div class="flex w-full">
    <div class="bg-white dark:bg-slate-800 shadow w-full mt-8">
      <nav class="stepper relative z-3 -top-8 mx-5 -mb-8 p-4 bg-white dark:bg-slate-700 shadow-md">
        <ul class="w-full flex justify-between">
          <slot name="head"></slot>
        </ul>
      </nav>

      <div ref="body" class="p-6">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
