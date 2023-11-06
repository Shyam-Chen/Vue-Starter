<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  rows?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
}>();

const textareaValue = computed({
  get: () => props.value || '',
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="textarea" :class="[disabled ? 'opacity-60' : '']">
    <label class="textarea-label">
      <template v-if="label">{{ label }}</template>
      <slot v-else></slot>
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <textarea
      v-model="textareaValue"
      v-bind="$attrs"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows ? rows : '5'"
      wrap="hard"
      class="textarea-input"
      :class="{
        'cursor-not-allowed': disabled,
        danger: errorMessage,
      }"
    ></textarea>

    <div v-if="errorMessage" class="text-red-500 text-xs">{{ errorMessage }}</div>
  </div>
</template>

<style lang="scss" scoped>
.textarea {
  @apply flex flex-col w-full;
}

.textarea-label {
  @apply text-sm font-bold mb-2 empty:hidden;
}

.textarea-input {
  @apply w-full border border-slate-400 rounded px-3 py-2;
  @apply bg-white dark:bg-slate-800 leading-tight;
  @apply focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400;

  &.danger {
    @apply border-red-500 mb-1;
    @apply focus:ring-red-500 focus:border-red-500;
  }
}
</style>
