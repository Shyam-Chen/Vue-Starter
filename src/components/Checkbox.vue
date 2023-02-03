<script lang="ts" setup>
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

const props = defineProps<{
  value?: boolean;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: boolean): void;
}>();

const uid = uniqueId('checkbox-');

const checkboxValue = computed({
  get: () => props.value || false,
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <label
    class="flex items-center"
    :class="[disabled ? 'cursor-not-allowed opacity-60' : checked ? '' : 'cursor-pointer']"
  >
    <div class="relative flex justify-center items-center">
      <input
        :id="uid"
        v-model="checkboxValue"
        v-bind="$attrs"
        :disabled="disabled"
        type="checkbox"
        class="checkbox"
        :class="[
          {
            'bg-primary-500': value || checked || indeterminate,
            'bg-white': !(value || checked || indeterminate),
          },
          disabled ? 'cursor-not-allowed' : checked ? '' : 'cursor-pointer',
        ]"
      />

      <div
        class="absolute select-none w-4 h-4 text-white"
        :class="[indeterminate ? 'i-mdi-minus-thick' : value || checked ? 'i-mdi-check-bold' : '']"
      ></div>
    </div>

    <div class="ml-2 empty:hidden">
      <slot></slot>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  @apply appearance-none w-5 h-5 rounded border border-slate-400 dark:border-slate-600;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-400 focus:shadow-lg;
}
</style>
