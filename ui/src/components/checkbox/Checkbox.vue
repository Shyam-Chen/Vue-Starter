<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

export interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  value?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  invalid?: string | boolean;
  disabled?: boolean;
  readonly?: boolean;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();

const emit = defineEmits<{
  (evt: 'update:value', val: boolean): void;
}>();

const checkboxValue = computed({
  get: () => props.value || false,
  set: (val) => !props.readonly && emit('update:value', val),
});

const uid = uniqueId('Checkbox-');
</script>

<template>
  <div class="Checkbox-Wrapper">
    <label class="Checkbox-Label" :class="{ disabled, readonly }">
      <div class="Checkbox-Container">
        <input
          :id="uid"
          v-model="checkboxValue"
          v-bind="$attrs"
          type="checkbox"
          :disabled="disabled"
          :readonly="readonly"
          class="Checkbox-Input"
          :class="{ hasValue: value || checked || indeterminate, invalid }"
        />

        <div
          class="Checkbox-Icon"
          :class="[
            indeterminate ? 'i-mdi-minus-thick' : value || checked ? 'i-mdi-check-bold' : '',
          ]"
        ></div>
      </div>

      <div class="Checkbox-Text">
        <slot></slot>
      </div>
    </label>

    <div v-if="typeof invalid === 'string' && invalid" class="text-red-500 text-xs mt-1">
      {{ invalid }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Checkbox-Wrapper {
  @apply inline-flex flex-col;
}

.Checkbox-Label {
  @apply flex items-center min-h-38px cursor-pointer;

  &.disabled {
    @apply cursor-not-allowed opacity-60;
  }

  &.readonly {
    @apply cursor-default;
  }
}

.Checkbox-Container {
  @apply relative flex justify-center items-center;
}

.Checkbox-Input {
  @apply appearance-none w-5 h-5 rounded border border-slate-400 dark:border-slate-600;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-400 focus:shadow-lg;
  @apply bg-white;

  &.hasValue {
    @apply bg-primary-500;
  }

  &.invalid {
    @apply border-red-500;
    @apply focus:ring-red-500 focus:border-red-500;
  }
}

.Checkbox-Icon {
  @apply absolute select-none w-4 h-4 text-white;
}

.Checkbox-Text {
  @apply ml-2 empty:hidden;
}
</style>
