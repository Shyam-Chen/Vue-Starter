<script lang="ts" setup>
import { ref, computed, provide } from 'vue';

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

const group = ref<HTMLDivElement>();
const curIdx = ref(-1);

provide('Accordion', {
  group,
  curIdx,
  value: computed(() => props.modelValue),
  modelValue: accordionGroupValue,
  multiple: computed(() => props.multiple),
});
</script>

<template>
  <div ref="group" class="flex flex-col gap-3">
    <slot></slot>
  </div>
</template>
