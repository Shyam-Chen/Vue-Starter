<script lang="ts" setup>
defineProps<{
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  icon?: string;
}>();

const emit = defineEmits<{
  (evt: 'close'): void;
}>();
</script>

<template>
  <div
    class="Alert"
    :class="{
      primary: color === 'primary' || !color,
      secondary: color === 'secondary',
      success: color === 'success',
      danger: color === 'danger',
      warning: color === 'warning',
      info: color === 'info',
    }"
  >
    <div class="flex w-full">
      <div v-if="icon">
        <div class="w-6 h-6 mr-3" :class="icon"></div>
      </div>

      <div class="flex-1">
        <slot></slot>
      </div>

      <div class="flex justify-center items-center w-6 h-6 ml-3">
        <div
          class="i-fa-times w-3 h-3 cursor-pointer transition hover:scale-125"
          @click.stop="emit('close')"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Alert {
  @apply flex justify-between p-4 rounded-lg border border-current backdrop-blur-2xl;

  &.primary {
    @apply text-primary-800 bg-primary-50/80;
    @apply dark:text-primary-400 dark:bg-primary-800/20;
  }

  &.secondary {
    @apply text-secondary-800 bg-secondary-50/80;
    @apply dark:text-secondary-400 dark:bg-secondary-800/20;
  }

  &.success {
    @apply text-success-800 bg-success-50/80;
    @apply dark:text-success-400 dark:bg-success-800/20;
  }

  &.danger {
    @apply text-danger-800 bg-danger-50/80;
    @apply dark:text-danger-400 dark:bg-danger-800/20;
  }

  &.warning {
    @apply text-warning-800 bg-warning-50/80;
    @apply dark:text-warning-400 dark:bg-warning-800/20;
  }

  &.info {
    @apply text-info-800 bg-info-50/80;
    @apply dark:text-info-400 dark:bg-info-800/20;
  }
}
</style>
