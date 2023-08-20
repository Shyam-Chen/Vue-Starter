<script lang="ts" setup>
import { reactive } from 'vue';

defineProps<{
  closable?: boolean;
  disabled?: boolean;
  color?: 'success' | 'warning' | 'danger';
}>();

const emit = defineEmits<{
  (evt: 'close'): void;
}>();

const flux = reactive({
  close() {
    emit('close');
  },
});
</script>

<template>
  <div class="flex">
    <div
      class="chip"
      :class="{
        success: color === 'success',
        warning: color === 'warning',
        danger: color === 'danger',
      }"
    >
      <slot></slot>

      <span v-if="closable && !disabled" class="close" @click.stop="flux.close"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chip {
  @apply flex items-center px-2 py-1 rounded-full;
  @apply text-xs text-center whitespace-nowrap;
  @apply bg-primary-600 text-white;

  &.success {
    @apply bg-green-500 dark:bg-green-700;
  }

  &.warning {
    @apply bg-yellow-500 dark:bg-yellow-700;
  }

  &.danger {
    @apply bg-red-500 dark:bg-red-700;
  }
}

.close {
  @apply i-fa-times-circle;
  @apply inline-flex w-3 h-3 ml-1 cursor-pointer transition hover:scale-125;
}
</style>
