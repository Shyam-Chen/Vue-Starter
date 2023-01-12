<script lang="ts" setup>
import { watch, onUnmounted } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emits = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
}>();

const closeDialog = () => {
  emits('update:modelValue', !props.modelValue);
};

watch(
  () => props.modelValue,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : 'auto';
  },
);

onUnmounted(() => {
  if (props.modelValue) {
    closeDialog();
  }
});
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-200"
    enter-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div v-if="props.modelValue" class="fixed z-101 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 backdrop-blur"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div
          class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="absolute top-1 right-1 cursor-pointer" @click="closeDialog">
            <div class="i-ion-close w-5 h-5"></div>
          </div>

          <div class="bg-white dark:bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
