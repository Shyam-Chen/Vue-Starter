<script lang="ts" setup>
import type { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left' | string>,
    default: 'left',
  },
});

const emits = defineEmits(['update:modelValue']);

const close = () => {
  emits('update:modelValue', !props.modelValue);
};
</script>

<template>
  <div
    class="fixed z-102 p-4 overflow-y-auto bg-white transition-all"
    :class="{
      'w-80 h-screen': placement === 'right' || placement === 'left',
      'top-0 -left-80': placement === 'left' && !modelValue,
      'top-0 left-0': placement === 'left' && modelValue,
      'top-0 -right-80': placement === 'right' && !modelValue,
      'top-0 right-0': placement === 'right' && modelValue,
      'w-full h-80': placement === 'top' || placement === 'bottom',
      'left-0 -top-80': placement === 'top' && !modelValue,
      'left-0 top-0': placement === 'top' && modelValue,
      'left-0 -bottom-80': placement === 'bottom' && !modelValue,
      'left-0 bottom-0': placement === 'bottom' && modelValue,
    }"
  >
    <slot></slot>
  </div>

  <div v-if="modelValue" class="fixed z-101 inset-0" aria-hidden="true" @click="close">
    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
  </div>
</template>
