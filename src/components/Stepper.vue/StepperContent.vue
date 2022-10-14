<script lang="ts" setup>
const props = defineProps({
  step: {
    type: [Number, String],
    default: 0,
  },
  current: {
    type: [Number, String],
    default: 0,
  },
});
</script>

<template>
  <div><slot></slot></div>
</template>
