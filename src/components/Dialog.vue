<script lang="ts" setup>
import { watch, onUnmounted } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
}>();

const closeDialog = () => {
  emit('update:modelValue', !props.modelValue);
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
          class="relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="absolute top-1.5 right-1.5 cursor-pointer" @click="closeDialog">
            <div class="i-fa-times w-3 h-3 transition hover:scale-125"></div>
          </div>

          <div class="bg-white dark:bg-slate-800 px-6 py-4">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
