<script lang="ts" setup>
defineProps<{
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
}>();
</script>

<template>
  <div class="flex items-center">
    <div
      class="border rounded text-xs px-2.5 py-0.5"
      :class="{
        'text-primary-500 border-primary-500 bg-primary-50': color === 'primary' || !color,
        'text-secondary-500 border-secondary-500': color === 'secondary',
        'text-success-500 border-success-500': color === 'success',
        'text-danger-500 border-danger-500': color === 'danger',
        'text-warning-500 border-warning-500': color === 'warning',
        'text-info-500 border-info-500': color === 'info',
      }"
    >
      <template v-if="label">{{ label }}</template>
      <slot></slot>
    </div>
  </div>
</template>
