<script lang="ts" setup>
withDefaults(
  defineProps<{
    step?: number | string;
    current?: number | string;
  }>(),
  {
    step: 0,
    current: 0,
  },
);
</script>

<template>
  <div><slot></slot></div>
</template>
