<script lang="ts" setup>
defineProps<{
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  icon?: string;
}>();
</script>

<template>
  <div
    class="alert"
    :class="{
      primary: color === 'primary' || !color,
      secondary: color === 'secondary',
      success: color === 'success',
      danger: color === 'danger',
      warning: color === 'warning',
      info: color === 'info',
    }"
  >
    <div class="flex">
      <div v-if="icon">
        <div class="w-6 h-6 mr-3" :class="icon"></div>
      </div>

      <div>
        <slot></slot>
      </div>

      <div class="flex justify-center items-center w-6 h-6 ml-3">
        <div class="i-fa-times w-3 h-3 cursor-pointer transition hover:scale-125"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  @apply flex justify-between max-w-100 p-4 rounded-lg border border-current;
}

.primary {
  @apply text-primary-800 bg-primary-50;
  @apply dark:text-primary-400 dark:bg-gray-800;
}

.secondary {
  @apply text-gray-800 bg-gray-50;
  @apply dark:text-gray-400 dark:bg-gray-800;
}

.success {
  @apply text-green-800 bg-green-50;
  @apply dark:text-green-400 dark:bg-gray-800;
}

.danger {
  @apply text-red-800 bg-red-50;
  @apply dark:text-red-400 dark:bg-gray-800;
}

.warning {
  @apply text-yellow-800 bg-yellow-50;
  @apply dark:text-yellow-400 dark:bg-gray-800;
}

.info {
  @apply text-sky-800 bg-sky-50;
  @apply dark:text-sky-400 dark:bg-gray-800;
}
</style>
