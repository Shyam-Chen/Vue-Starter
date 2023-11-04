<script lang="ts" setup>
import { watch, onUnmounted } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    placement?: 'top' | 'right' | 'bottom' | 'left';
  }>(),
  {
    modelValue: false,
    placement: 'left',
  },
);

const emit = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
}>();

const close = () => {
  emit('update:modelValue', !props.modelValue);
};

watch(
  () => props.modelValue,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : 'auto';
  },
);

onUnmounted(() => {
  close();
  document.body.style.overflow = 'auto';
});
</script>

<template>
  <div
    v-bind="$attrs"
    class="fixed z-102 py-4 overflow-y-auto bg-white dark:bg-slate-900 transition-all"
    :class="{
      'w-64 h-screen': placement === 'right' || placement === 'left',
      'top-0 -left-64': placement === 'left' && !modelValue,
      'top-0 left-0': placement === 'left' && modelValue,
      'top-0 -right-64': placement === 'right' && !modelValue,
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
