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
      class="flex items-center text-xs rounded-full inline-block whitespace-nowrap text-center bg-blue-600 text-white px-2 py-1"
      :class="{
        'important:bg-green-500 dark:important:bg-green-700': color === 'success',
        'important:bg-yellow-500 dark:important:bg-yellow-700': color === 'warning',
        'important:bg-red-500 dark:important:bg-red-700': color === 'danger',
      }"
    >
      <slot></slot>

      <span
        v-if="closable && !disabled"
        class="inline-block i-fa-times-circle w-3 h-3 ml-1 cursor-pointer transition hover:scale-125"
        @click.stop="flux.close"
      ></span>
    </div>
  </div>
</template>
