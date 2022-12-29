<script lang="ts" setup>
import { reactive } from 'vue';

defineProps<{
  closable?: boolean;
  disabled?: boolean;
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
