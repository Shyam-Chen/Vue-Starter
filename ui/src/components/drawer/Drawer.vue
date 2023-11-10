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
    class="Drawer"
    :class="{
      'w-64 h-screen top-0': placement === 'right' || placement === 'left',
      'left-0': placement === 'left',
      '-translate-x-full': placement === 'left' && !modelValue,
      'right-0': placement === 'right',
      'translate-x-full': placement === 'right' && !modelValue,
      'w-full h-64 left-0': placement === 'top' || placement === 'bottom',
      'top-0': placement === 'top',
      '-translate-y-full': placement === 'top' && !modelValue,
      'bottom-0': placement === 'bottom',
      'translate-y-full': placement === 'bottom' && !modelValue,
    }"
  >
    <slot></slot>
  </div>

  <div v-if="modelValue" class="fixed z-101 inset-0" aria-hidden="true" @click="close">
    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
  </div>
</template>

<style lang="scss" scoped>
.Drawer {
  @apply fixed z-102 py-4 overflow-y-auto bg-white dark:bg-slate-900 transition-transform;
}
</style>
