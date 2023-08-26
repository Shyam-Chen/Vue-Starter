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
  <Transition name="bounce">
    <div v-if="props.modelValue" class="dialog">
      <div class="dialog-container">
        <div class="dialog-backdrop" aria-hidden="true">
          <div></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div class="dialog-content" role="dialog" aria-modal="true">
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

<style lang="scss" scoped>
.dialog {
  @apply fixed z-101 inset-0 overflow-y-auto;
}

.dialog-container {
  @apply flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0;
}

.dialog-backdrop {
  @apply fixed inset-0;

  & > div {
    @apply absolute inset-0 backdrop-blur;
  }
}

.dialog-content {
  @apply relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl;
  @apply sm:my-8 sm:align-middle sm:max-w-lg sm:w-full;
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
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
