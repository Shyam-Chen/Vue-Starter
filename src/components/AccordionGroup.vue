<script lang="ts" setup>
import { ref, computed, provide, useSlots } from 'vue';

const props = defineProps<{
  modelValue?: string[];
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val: string[]): void;
}>();

const accordionGroupValue = computed({
  get: () => props.modelValue || [],
  set: (val) => emit('update:modelValue', val),
});

const group = ref();
const slots = useSlots();
const curIdx = ref(-1);

provide('AccordionGroup', {
  group,
  curIdx,
  value: props.modelValue,
  slots,
  modelValue: accordionGroupValue,
  multiple: props.multiple,
});
</script>

<template>
  <div ref="group" class="flex flex-col gap-3">
    <slot></slot>
  </div>
</template>
