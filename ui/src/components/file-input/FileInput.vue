<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import uniqueId from 'lodash/uniqueId';

import Chip from '../chip/Chip.vue';

const props = defineProps<{
  label?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean | string;
}>();

const emit = defineEmits<{
  (evt: 'change', val: Event): void;
}>();

const uid = uniqueId('uid-');

const placeholderRef = toRef(props, 'placeholder', 'Choose a file');

const flux = reactive({
  fileNames: [] as string[],
  onChange(event: Event) {
    const el = event.target as HTMLInputElement;
    const files = Array.from(el.files || []);
    flux.fileNames = files.map((file) => file.name);
    emit('change', event);
  },
});
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="FileInput-Label">
      <template v-if="label">{{ label }}</template>
      <span v-if="required" class="text-red-500">*</span>
      <slot></slot>
    </div>

    <label
      :for="uid"
      class="FileInput-Input"
      :class="{
        '!py-1': flux.fileNames.length > 1,
        disabled,
      }"
    >
      <div v-if="flux.fileNames.length > 1" class="flex flex-wrap gap-1">
        <Chip v-for="item in flux.fileNames" :key="item">
          {{ item }}
        </Chip>
      </div>
      <div v-else-if="flux.fileNames.length === 1">{{ flux.fileNames[0] }}</div>
      <div v-else class="text-slate-400 dark:text-slate-500">{{ placeholderRef }}</div>

      <div class="ms-1">
        <div class="i-material-symbols-upload-rounded w-5 h-5"></div>
      </div>
    </label>

    <div v-if="invalid && typeof invalid === 'string'" class="text-red-500 text-xs mt-1">
      {{ invalid }}
    </div>
  </div>

  <input
    :id="uid"
    ref="input"
    v-bind="$attrs"
    type="file"
    :disabled="disabled"
    class="hidden"
    @change="flux.onChange"
    @click="($refs.input as HTMLInputElement).value = ''"
  />
</template>

<style lang="scss" scoped>
.FileInput-Label {
  @apply empty:hidden flex items-center;
  @apply text-sm font-bold mb-2;
}

.FileInput-Input {
  @apply w-full flex justify-between items-center border rounded px-3 py-2 leading-tight;
  @apply bg-white dark:bg-slate-800 border-slate-500 dark:border-slate-400;
  @apply placeholder:text-slate-400 dark:placeholder:text-slate-500;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400;

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500/50 focus:border-red-500;
  }

  &.disabled {
    @apply cursor-not-allowed opacity-60;
  }
}
</style>
