<script lang="ts" setup>
import uniqueId from 'lodash/uniqueId';

defineProps<{
  label?: string;
  required?: boolean;
  invalid?: boolean | string;
  help?: string;
}>();

const uid = uniqueId('uid-');
</script>

<template>
  <label :for="uid" class="flex items-center mb-2 text-sm font-bold empty:hidden">
    <template v-if="label">{{ label }}</template>
    <span v-if="required" class="text-red-500">*</span>
    <slot name="label"></slot>
  </label>

  <div class="flex items-center min-h-38px">
    <slot :uid="uid" :invalid="!!invalid"></slot>
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
</template>
