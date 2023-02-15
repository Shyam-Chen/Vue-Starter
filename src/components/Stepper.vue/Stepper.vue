<script lang="ts" setup>
defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

defineEmits(['update:modelValue']);
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
