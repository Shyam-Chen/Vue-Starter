<script lang="ts" setup>
withDefaults(
  defineProps<{
    value?: number | number[];
    step?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
  }>(),
  {
    value: 0,
    step: 1,
    min: 0,
    max: 100,
  },
);

defineEmits<{
  (evt: 'update:value', val: number | number[]): void;
  (evt: 'change', val: number | number[]): void;
}>();
</script>

<template>
  <!-- rail -->
  <div class="w-full h-1 rounded bg-slate-500/50"></div>

  <!-- track -->
  <div class="h-1"></div>

  <!-- handle -->
  <div class="h-4 rounded-full"></div>

  <input type="range" />
</template>
