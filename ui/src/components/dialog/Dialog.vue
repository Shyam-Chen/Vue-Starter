<script lang="ts" setup>
import { nextTick, ref, watch, onUnmounted } from 'vue';
import { useResizeObserver } from '@vueuse/core';

import Bounce from '../bounce/Bounce.vue';

defineOptions({
  inheritAttrs: false,
});

const defaultModel = defineModel<boolean>({ default: false });

defineProps<{
  title?: string;
}>();

const dialog = ref<HTMLDivElement>();
const container = ref<HTMLDivElement>();
const backdropHeight = ref('100%');

const closeDialog = () => {
  defaultModel.value = false;
};

watch(
  () => defaultModel.value,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : 'auto';

    if (val) {
      nextTick(() => {
        dialog.value?.focus();
      });

      useResizeObserver(container, (entries) => {
        const entry = entries[0];
        const height = entry?.borderBoxSize?.[0]?.blockSize;
        if (height) backdropHeight.value = `${height}px`;
      });
    }
  },
);

onUnmounted(() => {
  if (defaultModel.value) {
    document.body.style.overflow = 'auto';
    closeDialog();
  }
});
</script>

<template>
  <Bounce>
    <div
      v-if="defaultModel"
      ref="dialog"
      tabindex="0"
      class="dialog"
      @keyup.esc="defaultModel = false"
    >
      <div ref="container" class="dialog-container">
        <div
          class="dialog-backdrop"
          aria-hidden="true"
          :style="{ height: backdropHeight }"
          @click="closeDialog"
        ></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div v-bind="$attrs" class="dialog-content" role="dialog" aria-modal="true">
          <div class="bg-white dark:bg-slate-800 p-6">
            <div v-if="title" class="flex items-center w-full mb-6">
              <div class="flex-1 text-3xl font-bold">{{ title }}</div>

              <div class="cursor-pointer" @click="closeDialog">
                <div class="i-fa-times transition hover:scale-125"></div>
              </div>
            </div>

            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Bounce>
</template>

<style lang="scss" scoped>
.dialog {
  @apply fixed z-110 inset-0 overflow-y-auto;
}

.dialog-container {
  @apply flex justify-center items-center min-h-screen p-4 text-center sm:block sm:p-0;
}

.dialog-backdrop {
  @apply absolute inset-0 bg-gray-500 opacity-75;
}

.dialog-content {
  @apply relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl;
  @apply my-8 align-middle md:max-w-lg lg:max-w-2xl xl:max-w-4xl w-full;
}
</style>
