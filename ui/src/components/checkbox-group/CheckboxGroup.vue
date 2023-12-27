<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

import Checkbox from '../checkbox/Checkbox.vue';

export interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string;
  value?: unknown[];
  options?: string[] | Array<{ label: string; value: unknown }>;
  required?: boolean;
  invalid?: boolean | string;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();

const emit = defineEmits<{
  (evt: 'update:value', val: unknown[]): void;
  (evt: 'change', val: unknown[]): void;
}>();

const uid = uniqueId('uid-');

const valueModel = computed({
  get: () => props.value || [],
  set: (val) => emit('update:value', val),
});

function onChange(val: unknown) {
  const idx = valueModel.value.findIndex((item) => item === val);

  if (idx !== -1) {
    const arr = [...valueModel.value];
    arr.splice(idx, 1);
    valueModel.value = arr;
  } else {
    valueModel.value = [...valueModel.value, val];
  }
}
</script>

<template>
  <div class="CheckboxGroup">
    <div class="CheckboxGroup-Label">
      <template v-if="label">{{ label }}</template>
      <span v-if="required" class="text-red-500">*</span>
      <slot></slot>
    </div>

    <div class="flex items-center gap-4">
      <Checkbox
        v-for="(item, idx) in options"
        v-bind="$attrs"
        :key="idx"
        :name="uid"
        :value="valueModel.includes(typeof item === 'object' ? item.value : item)"
        :invalid="Boolean(invalid)"
        @change="onChange(typeof item === 'object' ? item.value : item)"
      >
        {{ typeof item === 'object' ? item.label : item }}
      </Checkbox>
    </div>

    <div v-if="typeof invalid === 'string' && invalid" class="text-red-500 text-xs mt-1">
      {{ invalid }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.CheckboxGroup {
  @apply flex flex-col;
}

.CheckboxGroup-Label {
  @apply flex items-center text-sm font-bold mb-2 empty:hidden;
}
</style>
