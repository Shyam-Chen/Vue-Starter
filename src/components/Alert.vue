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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  @apply flex justify-between p-4 rounded-lg;
}

.primary {
  @apply bg-blue-600 text-blueGray-200;
}

.secondary {
  @apply bg-slate-500 text-slate-200;
}

.success {
  @apply bg-green-600 text-blueGray-200;
}

.danger {
  @apply bg-red-600 dark:bg-red-700 text-blueGray-200;
}

.warning {
  @apply bg-yellow-500 dark:bg-yellow-600 text-blueGray-200;
}

.info {
  @apply bg-sky-600 text-blueGray-200;
}
</style>
