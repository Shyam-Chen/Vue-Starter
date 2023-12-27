<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

defineProps<{
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  count?: string;
}>();
</script>

<template>
  <span class="relative">
    <slot></slot>
    <span
      v-bind="$attrs"
      class="absolute top-0 right-0 flex justify-center items-center bg-primary-500 text-white rounded-full text-sm translate-x-1/2 -translate-y-1/2"
      :class="[count ? 'min-w-5 h-5 px-1.5' : 'w-3 h-3']"
      >{{ count }}</span
    >
  </span>
</template>
