<script lang="ts" setup>
import { useId } from 'vue';
import { formControlDefaults } from './helpers';
import type { FormControlProps } from './types';

withDefaults(defineProps<FormControlProps>(), formControlDefaults);

const id = useId();
</script>

<template>
  <div class="flex flex-col w-full">
    <div v-if="label || sub" class="flex items-center text-sm mb-1" :class="{ 'md:pt-5': sub }">
      <label :for="id" class="inline-flex font-bold empty:hidden">{{ label }}</label>
      <span v-if="required" class="text-red-500 ms-0.5">*</span>
      <slot name="label"></slot>
    </div>

    <div class="flex items-center">
      <slot :id :invalid="!!invalid"></slot>
    </div>

    <div v-if="invalid && typeof invalid === 'string'" class="text-red-500 text-xs mt-1">
      {{ invalid }}
    </div>

    <div
      v-if="!(invalid && typeof invalid === 'string') && help"
      class="text-gray-500 dark:text-gray-400 text-xs mt-1"
    >
      {{ help }}
    </div>
  </div>
</template>
