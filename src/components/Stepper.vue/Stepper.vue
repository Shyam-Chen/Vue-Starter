<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue?: number;
  }>(),
  {
    modelValue: 0,
  },
);

defineEmits<{
  (evt: 'update:modelValue', val: number): void;
}>();
</script>

<template>
  <div class="bg-white dark:bg-slate-800 shadow w-full mt-8">
    <nav class="stepper relative -top-8 mx-5 -mb-8 p-4 bg-white dark:bg-slate-700 shadow-md">
      <ul class="w-full flex justify-between">
        <slot name="header"></slot>
      </ul>
    </nav>

    <div class="p-6">
      <slot name="items"></slot>
    </div>
  </div>
</template>
