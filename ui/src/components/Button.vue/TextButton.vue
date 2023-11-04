<script lang="ts" setup>
defineProps<{
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  icon?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    class="button"
    :class="{
      primary: color === 'primary' || !color,
      secondary: color === 'secondary',
      success: color === 'success',
      danger: color === 'danger',
      warning: color === 'warning',
      info: color === 'info',
      icon: icon,
      'opacity-60 cursor-not-allowed': disabled,
    }"
    :disabled="disabled"
  >
    <div v-if="icon" class="w-4 h-4" :class="icon"></div>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.button {
  @apply flex justify-center items-center gap-2 px-6 py-2 border border-transparent rounded uppercase text-sm font-medium;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/40;
}

.icon {
  @apply p-0 rounded-full w-38px h-38px;
}

.primary {
  @apply text-primary-500;

  @apply hover:text-primary-600 hover:bg-slate-300;
  @apply dark:hover:text-primary-400 dark:hover:bg-slate-700;

  @apply active:bg-slate-400 dark:active:bg-slate-800;
}

.secondary {
  @apply text-slate-500;

  @apply hover:text-slate-600 hover:bg-slate-300;
  @apply dark:hover:text-slate-400 dark:hover:bg-slate-700;

  @apply active:bg-slate-400 dark:active:bg-slate-800;
}

.success {
  @apply text-green-500;

  @apply hover:text-green-600 hover:bg-slate-300;
  @apply dark:hover:text-green-400 dark:hover:bg-slate-700;

  @apply active:bg-slate-400 dark:active:bg-slate-800;
}

.danger {
  @apply text-red-500;

  @apply hover:text-red-600 hover:bg-slate-300;
  @apply dark:hover:text-red-400 dark:hover:bg-slate-700;

  @apply active:bg-slate-400 dark:active:bg-slate-800;
}

.warning {
  @apply text-yellow-500;

  @apply hover:text-yellow-600 hover:bg-slate-300;
  @apply dark:hover:text-yellow-400 dark:hover:bg-slate-700;

  @apply active:bg-slate-400 dark:active:bg-slate-800;
}

.info {
  @apply text-sky-500;

  @apply hover:text-sky-600 hover:bg-slate-300;
  @apply dark:hover:text-sky-400 dark:hover:bg-slate-700;

  @apply active:bg-slate-400 dark:active:bg-slate-800;
}
</style>
