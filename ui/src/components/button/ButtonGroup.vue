<script lang="ts" setup>
import { ref, computed, provide } from 'vue';

const props = defineProps<{
  modelValue?: number;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val: number): void;
}>();

const model = computed({
  get: () => (typeof props.modelValue === 'number' ? props.modelValue : -1),
  set: (val) => emit('update:modelValue', val),
});

const group = ref<HTMLDivElement>();

provide('ButtonGroup', {
  model,
  group,
});
</script>

<template>
  <div ref="group" class="ButtonGroup">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.ButtonGroup {
  @apply inline-flex w-full overflow-auto;

  :deep(.Button) {
    @apply !first:rounded-l !rounded-0 !last:rounded-r;
    @apply !first:border-l !border-l-0;
  }
}
</style>
