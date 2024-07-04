<script lang="ts" setup>
import uniqueId from 'lodash/uniqueId';

import { type FormControlProps, formControlDefaults } from './config';

withDefaults(defineProps<FormControlProps>(), formControlDefaults);

const uid = uniqueId('uid-');
</script>

<template>
  <div class="flex flex-col w-full">
    <div v-if="label" class="flex items-center text-sm mb-1">
      <label :for="uid" class="inline-flex font-bold empty:hidden">{{ label }} </label>
      <span v-if="required" class="text-red-500 ms-0.5">*</span>
      <slot name="label"></slot>
    </div>

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
  </div>
</template>
