<script lang="ts" setup>
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

type OptionValue = unknown;
type CheckboxGroupValue = OptionValue[];

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  label?: string;
  value?: CheckboxGroupValue;
  options?: string[] | number[] | Array<{ label: string; value: OptionValue }>;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: CheckboxGroupValue): void;
  (evt: 'change', val: CheckboxGroupValue): void;
}>();

const uid = uniqueId('checkbox-group-');

const checkboxGroupValue = computed({
  get: () => props.value || [],
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="flex flex-col">
    <div class="text-sm mb-2 font-bold empty:hidden">{{ label }}</div>

    <div class="flex items-center h-38px space-x-4">
      <label
        v-for="(item, idx) in options"
        :key="idx"
        class="flex items-center"
        :class="[disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer']"
      >
        <div class="relative flex justify-center items-center">
          <input
            :id="`${uid}-${idx}`"
            v-model="checkboxGroupValue"
            v-bind="$attrs"
            type="checkbox"
            :name="uid"
            :value="typeof item === 'object' ? item.value : item"
            :disabled="disabled"
            class="checkbox"
            :class="{
              'bg-primary-500': checkboxGroupValue.includes(
                typeof item === 'object' ? item.value : item,
              ),
              'bg-white': !checkboxGroupValue.includes(
                typeof item === 'object' ? item.value : item,
              ),
            }"
            @change="emit('change', checkboxGroupValue)"
          />

          <div
            class="absolute select-none w-4 h-4 text-white"
            :class="{
              'i-mdi-check-bold': checkboxGroupValue.includes(
                typeof item === 'object' ? item.value : item,
              ),
            }"
          ></div>
        </div>

        <div class="ml-2">
          {{ typeof item === 'object' ? item.label : item }}
        </div>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  @apply appearance-none w-5 h-5 rounded border border-slate-400 dark:border-slate-600;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-400 focus:shadow-lg;
}
</style>
