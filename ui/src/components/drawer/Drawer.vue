<script lang="ts" setup>
import { onUnmounted, watch } from 'vue';

const defaultModel = defineModel<boolean>({ default: false });

withDefaults(
  defineProps<{
    placement?: 'top' | 'right' | 'bottom' | 'left';
  }>(),
  {
    placement: 'left',
  },
);

const close = () => {
  defaultModel.value = false;
};

watch(
  () => defaultModel.value,
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
      'top-0 w-64 h-100dvh': placement === 'right' || placement === 'left',
      'left-0': placement === 'left',
      '-translate-x-full': placement === 'left' && !modelValue,
      'right-0': placement === 'right',
      'translate-x-full': placement === 'right' && !modelValue,
      'left-0 w-full h-64': placement === 'top' || placement === 'bottom',
      'top-0': placement === 'top',
      '-translate-y-full': placement === 'top' && !modelValue,
      'bottom-0': placement === 'bottom',
      'translate-y-full': placement === 'bottom' && !modelValue,
    }"
  >
    <slot></slot>
  </div>

  <div v-if="modelValue" class="fixed inset-0 z-101" aria-hidden="true" @click="close">
    <div class="absolute inset-0 bg-gray-500/75"></div>
  </div>
</template>

<style lang="scss" scoped>
.Drawer {
  @apply overflow-y-auto fixed z-102 py-4 bg-white dark:bg-slate-900 transition-transform;
}
</style>
