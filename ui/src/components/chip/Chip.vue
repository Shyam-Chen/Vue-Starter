<script lang="ts" setup>
defineProps<{
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  closable?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'close'): void;
}>();
</script>

<template>
  <div class="flex" :class="[disabled ? 'cursor-not-allowed opacity-60' : '']">
    <div
      class="Chip"
      :class="{
        primary: color === 'primary' || !color,
        secondary: color === 'secondary',
        success: color === 'success',
        warning: color === 'warning',
        danger: color === 'danger',
        info: color === 'info',
      }"
    >
      <slot></slot>

      <span v-if="closable && !disabled" class="Chip-Close" @click.stop="emit('close')"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Chip {
  @apply flex items-center px-2 py-1 rounded-full;
  @apply text-xs text-center whitespace-nowrap;

  &.primary {
    @apply bg-primary-500 text-white;
  }

  &.secondary {
    @apply bg-gray-500 text-white;
  }

  &.success {
    @apply bg-green-500 text-white;
  }

  &.warning {
    @apply bg-yellow-500 text-white;
  }

  &.danger {
    @apply bg-red-500 text-white;
  }

  &.info {
    @apply bg-sky-500 text-white;
  }
}

.Chip-Close {
  @apply i-fa-times-circle;
  @apply inline-flex w-3 h-3 ml-1 cursor-pointer transition hover:scale-125;
}
</style>
