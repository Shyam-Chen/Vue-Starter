<script lang="ts" setup>
import { computed } from 'vue';
import { IMaskDirective as vImask } from 'vue-imask';
import uniqueId from 'lodash/uniqueId';

const props = defineProps<{
  id?: string;
  masked?: string;
  unmasked?: any;
  mask?: object;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  (evt: 'update:masked', val?: string): void;
  (evt: 'update:unmasked', val?: any): void;
}>();

const maskedModel = computed({
  get: () => props.masked,
  set: (val) => emit('update:masked', val),
});

const unmaskedModel = computed({
  get: () => props.unmasked,
  set: (val) => emit('update:unmasked', val),
});

const uid = uniqueId('input-mask-');

function onAccept(evt: CustomEvent) {
  const maskRef = evt.detail;
  maskedModel.value = maskRef.value;
}

function onComplete(evt: CustomEvent) {
  const maskRef = evt.detail;
  unmaskedModel.value = maskRef.unmaskedValue;
}
</script>

<template>
  <div class="InputMask-Wrapper" :class="[disabled ? 'opacity-60' : '']">
    <label :for="id || uid" class="InputMask-Label">
      <template v-if="label">{{ label }}</template>
      <slot v-else></slot>
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="flex items-center w-full">
      <input
        :id="id || uid"
        v-imask="mask"
        v-bind="$attrs"
        :value="masked"
        :disabled="disabled"
        class="InputMask-Input"
        :class="{ danger: errorMessage }"
        type="text"
        autocomplete="off"
        @accept="onAccept"
        @complete="onComplete"
      />
    </div>

    <div v-if="errorMessage" class="text-red-500 text-xs">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.InputMask-Wrapper {
  @apply relative flex flex-col w-full;
}

.InputMask-Label {
  @apply text-sm font-bold mb-2 empty:hidden;
}

.InputMask-Input {
  @apply w-full border border-slate-400 rounded px-3 py-2 z-2;
  @apply bg-white dark:bg-slate-800 leading-tight;
  @apply focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400;

  &.danger {
    @apply border-red-500 mb-1;
    @apply focus:ring-red-500 focus:border-red-500;
  }
}
</style>
