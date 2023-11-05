<script lang="ts" setup>
import type { ComputedRef } from 'vue';
import { inject } from 'vue';

defineProps<{
  step: number;
}>();

const stepper = inject('Stepper') as { modelValue: ComputedRef<number> };
</script>

<template>
  <li
    class="StepperStep"
    :class="{
      'text-green-500 dark:text-green-400': Number(step) < stepper.modelValue.value,
      'text-primary-500 dark:text-primary-400': Number(step) === stepper.modelValue.value,
      'text-slate-500 dark:text-slate-400': Number(step) > stepper.modelValue.value,
    }"
  >
    <div class="StepperStep-Icon">
      <div
        v-if="Number(step) < stepper.modelValue.value"
        class="i-mdi-checkbox-marked-circle-outline w-6 h-6"
      ></div>
      <div
        v-if="Number(step) === stepper.modelValue.value"
        class="i-mdi-dots-horizontal-circle-outline w-6 h-6"
      ></div>
      <div
        v-if="Number(step) > stepper.modelValue.value"
        class="i-mdi-checkbox-blank-circle-outline w-6 h-6"
      ></div>
    </div>

    <span><slot></slot></span>
  </li>
</template>

<style lang="scss" scoped>
.StepperStep {
  @apply relative flex flex-col items-center flex-1 p-3;

  &:not(:last-of-type)::after {
    @apply content-[''] absolute z-1 w-full border border-slate-300 dark:border-slate-500;

    transform: translate(50%, 11px);
  }
}

.StepperStep-Icon {
  @apply w-12 h-6 mb-4 flex justify-center items-center bg-white dark:bg-slate-700 z-2;
}
</style>
