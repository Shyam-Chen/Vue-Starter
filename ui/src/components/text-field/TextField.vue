<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import { computed, reactive } from 'vue';
import uniqueId from 'lodash/uniqueId';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  id?: string;
  label?: string;
  value?: string;
  type?: string;
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  prepend?: string;
  append?: string;
  invalid?: boolean | string;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
  (evt: 'clear'): void;
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
  touched: false,
  clear() {
    textFieldValue.value = '';
    emit('clear');
  },
});
</script>

<template>
  <div class="TextField" :class="[disabled ? 'opacity-60' : '']">
    <label :for="id || uid" class="TextField-Label">
      <template v-if="label">{{ label }}</template>
      <span v-if="required" class="text-red-500">*</span>
      <slot></slot>
    </label>

    <div class="relative">
      <div v-if="prepend" class="TextField-Prepend" @click.stop="emit('prepend')">
        <div :class="prepend" class="w-5 h-5"></div>
      </div>

      <input
        :id="id || uid"
        v-model="textFieldValue"
        v-bind="$attrs"
        :type="type ? type : 'text'"
        :disabled="disabled"
        class="TextField-Input"
        :class="{ invalid, disabled, prepend, append, clearable }"
        autocomplete="off"
        @focus="flux.focused = true"
        @blur="
          flux.focused = false;
          flux.touched = true;
        "
      />

      <div v-if="append" class="TextField-Append" @click.stop="emit('append')">
        <div :class="append" class="w-5 h-5"></div>
      </div>

      <div
        v-if="clearable && textFieldValue"
        class="i-material-symbols-close-small-rounded TextField-Clear"
        :class="{ prepend, append }"
        @click.stop="flux.clear"
      ></div>
    </div>

    <div v-if="invalid && typeof invalid === 'string'" class="text-red-500 text-xs mt-1">
      {{ invalid }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.TextField {
  @apply flex flex-col w-full;
}

.TextField-Label {
  @apply empty:hidden flex items-center;
  @apply text-sm font-bold mb-2;
}

.TextField-Prepend {
  @apply absolute start-2 top-1/2 z-1 w-5 h-5 -translate-y-1/2;
}

.TextField-Input {
  @apply w-full border rounded px-3 py-2 leading-tight;
  @apply bg-white dark:bg-slate-800 border-slate-500 dark:border-slate-400;
  @apply placeholder:text-slate-400 dark:placeholder:text-slate-500;
  @apply focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400;

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500 focus:border-red-500;
  }

  &.disabled {
    @apply cursor-not-allowed;
  }

  &.prepend {
    @apply ps-8;
  }

  &.append {
    @apply pe-8;
  }

  &.clearable {
    @apply pe-8;

    &.append {
      @apply pe-13;
    }
  }
}

.TextField-Append {
  @apply absolute end-2 top-1/2 z-1 w-5 h-5 -translate-y-1/2;
}

.TextField-Clear {
  @apply absolute end-2 top-1/2 z-99 w-5 h-5 -translate-y-1/2 cursor-pointer hover:scale-125;

  &.append {
    @apply end-8;
  }
}
</style>
