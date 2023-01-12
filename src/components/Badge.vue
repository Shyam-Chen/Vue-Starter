<script lang="ts" setup>
defineProps<{
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  count?: string;
}>();
</script>

<template>
  <span class="relative">
    <slot></slot>
    <span
      class="absolute top-0 right-0 flex justify-center items-center bg-pink-700 text-white rounded-full text-sm translate-x-1/2 -translate-y-1/2"
      :class="[count ? 'min-w-5 h-5 px-1.5' : 'w-3 h-3']"
      >{{ count }}</span
    >
  </span>
</template>
