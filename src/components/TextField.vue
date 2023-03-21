<script lang="ts" setup>
import { computed, reactive } from 'vue';

const props = defineProps<{
  label?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  prepend?: string;
  append?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
  (evt: 'prepend'): void;
  (evt: 'append'): void;
}>();

const textFieldValue = computed({
  get: () => props.value || '',
  set: (val) => emit('update:value', val),
});

const flux = reactive({
  focused: false,
});
</script>

<template>
  <div class="text-field" :class="[disabled ? 'opacity-60' : '']">
    <label class="text-field-label">
      <template v-if="label">{{ label }}</template>
      <slot v-else></slot>
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="flex w-full items-center">
      <div
        v-if="prepend"
        class="text-field-prepend"
        :class="{
          'text-field-focused': flux.focused,
          'important:border-red-500 important:ring-red-500 mb-1': errorMessage,
        }"
        @click.stop="emit('prepend')"
      >
        <div :class="prepend" class="w-5 h-5"></div>
      </div>

      <input
        v-model="textFieldValue"
        v-bind="$attrs"
        :type="type ? type : 'text'"
        :disabled="disabled"
        class="text-field-input"
        :class="{
          danger: errorMessage,
          prepend,
          append,
        }"
        @focus="flux.focused = true"
        @blur="flux.focused = false"
      />

      <div
        v-if="append"
        class="text-field-append"
        :class="{
          'text-field-focused': flux.focused,
          'important:border-red-500 important:ring-red-500 mb-1': errorMessage,
        }"
        @click.stop="emit('append')"
      >
        <div :class="append" class="w-5 h-5"></div>
      </div>
    </div>

    <div v-if="errorMessage" class="text-red-500 text-xs">{{ errorMessage }}</div>
  </div>
</template>

<style lang="scss" scoped>
.text-field {
  @apply flex flex-col w-full relative;
}

.text-field-label {
  @apply text-sm font-bold mb-2 empty:hidden;
}

.text-field-input {
  @apply w-full border border-slate-400 rounded px-3 py-2 z-2;
  @apply bg-white dark:bg-slate-800 leading-tight;
  @apply focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400;

  &.danger {
    @apply border-red-500 mb-1;
    @apply focus:ring-red-500 focus:border-red-500;
  }

  &.prepend {
    @apply rounded-l-0;
  }

  &.append {
    @apply rounded-r-0;
  }
}

.text-field-prepend {
  @apply p-2 border border-slate-400 border-r-0 rounded rounded-r-0 bg-white dark:bg-slate-800 z-1;
}

.text-field-append {
  @apply p-2 border border-slate-400 border-l-0 rounded rounded-l-0 bg-white dark:bg-slate-800 z-1;
}

.text-field-focused {
  @apply ring-1 ring-primary-400 border-primary-400;
}
</style>
