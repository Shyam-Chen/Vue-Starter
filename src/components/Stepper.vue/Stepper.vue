<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="bg-white shadow w-full mt-8">
    <nav class="stepper relative -top-8 mx-5 -mb-8 p-4 bg-white shadow-md">
      <ul class="w-full flex justify-between">
        <slot name="header"></slot>
      </ul>
    </nav>

    <div class="p-6">
      <slot name="items"></slot>
    </div>
  </div>
</template>
