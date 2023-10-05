<script lang="ts" setup>
import { ref, watch, onUnmounted } from 'vue';
import { useResizeObserver } from '@vueuse/core';

const props = defineProps<{
  modelValue: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
}>();

const container = ref<HTMLDivElement>();
const backdropHeight = ref('100%');

const closeDialog = () => {
  emit('update:modelValue', !props.modelValue);
};

watch(
  () => props.modelValue,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : 'auto';

    if (val) {
      useResizeObserver(container, (entries) => {
        const entry = entries[0];
        const height = entry?.borderBoxSize?.[0]?.blockSize;
        if (height) backdropHeight.value = `${height}px`;
      });
    }
  },
);

onUnmounted(() => {
  if (props.modelValue) {
    closeDialog();
  }
});
</script>

<template>
  <Transition name="bounce">
    <div v-if="props.modelValue" class="dialog">
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

        <div class="dialog-content" role="dialog" aria-modal="true">
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
  </Transition>
</template>

<style lang="scss" scoped>
.dialog {
  @apply fixed z-101 inset-0 overflow-y-auto;
}

.dialog-container {
  @apply flex justify-center items-center min-h-screen p-4;
}

.dialog-backdrop {
  @apply absolute inset-0 bg-gray-500 opacity-75;
}

.dialog-content {
  @apply relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl;
  @apply my-8 align-middle md:max-w-lg lg:max-w-2xl xl:max-w-4xl w-full;
}

.bounce-enter-active {
  animation: bounce-in 0.33s;
}

.bounce-leave-active {
  animation: bounce-in 0.33s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
