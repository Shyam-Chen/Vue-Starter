<script lang="ts" setup>
defineProps<{
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  icon?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    class="Button"
    :class="{
      contained: variant === 'contained' || !variant,
      outlined: variant === 'outlined',
      text: variant === 'text',
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
.Button {
  @apply flex justify-center items-center gap-2 px-6 py-2 border rounded uppercase text-sm font-medium;
  @apply shadow-md hover:shadow-lg;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/40;

  &.outlined {
    @apply border-current;
  }

  &.text {
    @apply border-transparent;
  }

  &.primary {
    @apply bg-primary-500 text-white border-primary-500;

    @apply hover:text-blueGray-300 hover:bg-primary-600;
    @apply dark:hover:text-blueGray-300 dark:hover:bg-primary-600;

    @apply active:bg-primary-400 dark:active:bg-primary-800;
  }
}

.icon {
  @apply p-0 rounded-full w-38px h-38px;
}

.secondary {
  @apply bg-slate-500 text-slate-200 border-slate-500;

  @apply hover:text-slate-600 hover:bg-slate-300;
  @apply dark:hover:text-slate-400 dark:hover:bg-slate-700;

  @apply active:bg-slate-400 dark:active:bg-slate-800;
}

.success {
  @apply bg-green-600 text-blueGray-200 border-green-600;

  @apply hover:text-blueGray-300 hover:bg-green-700;
  @apply dark:hover:text-blueGray-300 dark:hover:bg-green-700;

  @apply active:bg-green-400 dark:active:bg-green-800;
}

.danger {
  @apply bg-red-600 dark:bg-red-700 text-blueGray-200 border-red-600 dark:border-red-700;

  @apply hover:text-blueGray-300 hover:bg-red-700;
  @apply dark:hover:text-blueGray-300 dark:hover:bg-red-800;

  @apply active:bg-red-400 dark:active:bg-red-900;
}

.warning {
  @apply bg-yellow-500 dark:bg-yellow-600 text-blueGray-200 border-yellow-500 dark:border-yellow-600;

  @apply hover:text-blueGray-300 hover:bg-yellow-700;
  @apply dark:hover:text-blueGray-300 dark:hover:bg-yellow-700;

  @apply active:bg-yellow-400 dark:active:bg-yellow-800;
}

.info {
  @apply bg-sky-600 text-blueGray-200 border-sky-600;

  @apply hover:text-blueGray-300 hover:bg-sky-700;
  @apply dark:hover:text-blueGray-300 dark:hover:bg-sky-700;

  @apply active:bg-sky-400 dark:active:bg-sky-800;
}
</style>
