<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import { computed, reactive } from 'vue';
import uniqueId from 'lodash/uniqueId';

defineOptions({
  inheritAttrs: false,
});

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  id?: string;
  label?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  prepend?: string;
  append?: string;
  errorMessage?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
  (evt: 'prepend'): void;
  (evt: 'append'): void;
}>();

const uid = uniqueId('text-field-');

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
    <label :for="id || uid" class="text-field-label">
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
        :id="id || uid"
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
    @apply ltr:rounded-l-0 rtl:rounded-r-0;
  }

  &.append {
    @apply ltr:rounded-r-0 rtl:rounded-l-0;
  }
}

.text-field-prepend {
  @apply p-2 border border-slate-400 rounded bg-slate-100 dark:bg-slate-700 z-1;
  @apply ltr:border-r-0 ltr:rounded-r-0 rtl:border-l-0 rtl:rounded-l-0;
}

.text-field-append {
  @apply p-2 border border-slate-400 rounded bg-slate-100 dark:bg-slate-700 z-1;
  @apply ltr:border-l-0 ltr:rounded-l-0 rtl:border-r-0 rtl:rounded-r-0;
}

.text-field-focused {
  @apply ring-1 ring-primary-400 border-primary-400;
}
</style>
