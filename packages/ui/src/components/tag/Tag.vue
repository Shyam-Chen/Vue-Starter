<script lang="ts" setup>
defineProps<{
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
}>();
</script>

<template>
  <div class="flex items-center">
    <div
      class="border rounded text-10px px-10px py-2px mr-5px"
      :class="{
        'text-primary-500 border-primary-500': color === 'primary' || !color,
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
