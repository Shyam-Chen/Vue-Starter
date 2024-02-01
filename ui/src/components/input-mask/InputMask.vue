<script lang="ts" setup>
import { computed } from 'vue';
import { IMaskDirective as vImask } from 'vue-imask';
import uniqueId from 'lodash/uniqueId';

const props = defineProps<{
  id?: string;
  masked?: string;
  unmasked?: string | number;
  mask?: object;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean | string;
}>();

const emit = defineEmits<{
  (evt: 'update:masked', val?: string): void;
  (evt: 'update:unmasked', val?: string | number): void;
}>();

const maskedModel = computed({
  get: () => props.masked,
  set: (val) => emit('update:masked', val),
});

const unmaskedModel = computed({
  get: () => props.unmasked,
  set: (val) => emit('update:unmasked', val),
});

const uid = uniqueId('uid-');

function onAccept(evt: CustomEvent) {
  const maskRef = evt.detail;
  maskedModel.value = maskRef.value;
  unmaskedModel.value = maskRef.unmaskedValue || undefined;
}
</script>

<template>
  <div class="InputMask" :class="[disabled ? 'opacity-60' : '']">
    <label :for="id || uid" class="InputMask-Label">
      <template v-if="label">{{ label }}</template>
      <span v-if="required" class="text-red-500">*</span>
      <slot></slot>
    </label>

    <div class="flex items-center w-full">
      <input
        :id="id || uid"
        v-imask="mask"
        v-bind="$attrs"
        :value="masked"
        :disabled="disabled"
        class="InputMask-Input"
        :class="{ invalid, disabled }"
        type="text"
        autocomplete="off"
        @accept="onAccept"
      />
    </div>

    <div v-if="invalid && typeof invalid === 'string'" class="text-red-500 text-xs mt-1">
      {{ invalid }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.InputMask {
  @apply flex flex-col w-full;
}

.InputMask-Label {
  @apply flex items-center mb-2 text-sm font-bold empty:hidden;
}

.InputMask-Input {
  @apply w-full border border-slate-400 rounded px-3 py-2 z-2;
  @apply bg-white dark:bg-slate-800 leading-tight;
  @apply placeholder:text-slate-400 dark:placeholder:text-slate-500;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400;

  &.invalid {
    @apply border-red-500;
    @apply focus:ring-red-500/50 focus:border-red-500;
  }

  &.disabled {
    @apply cursor-not-allowed;
  }
}
</style>
