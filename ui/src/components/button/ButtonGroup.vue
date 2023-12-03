<script lang="ts" setup>
import { ref, computed, provide } from 'vue';

const props = defineProps<{
  modelValue?: number | number[];
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val: number | number[]): void;
}>();

const model = computed({
  get: () => {
    if (props.multiple) return props.modelValue || [-1];
    return typeof props.modelValue === 'number' ? props.modelValue : -1;
  },
  set: (val) => emit('update:modelValue', val),
});

const group = ref<HTMLDivElement>();

provide('ButtonGroup', {
  model,
  group,
});
</script>

<template>
  <div ref="group" class="ButtonGroup inline-flex">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.ButtonGroup {
  :deep(.Button) {
    @apply !first:rounded-l !rounded-0 !last:rounded-r;
    @apply !first:border-l !border-l-0;
  }
}
</style>
