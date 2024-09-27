<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import { IMaskDirective as vImask } from 'vue-imask';

import type { FormControlProps } from '../form-control';
import FormControl, { formControlDefaults, useFormControlAttrs } from '../form-control';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  disabled?: InputHTMLAttributes['disabled'];
  mask?: object;
}

const maskedModel = defineModel<string>('masked');
const unmaskedModel = defineModel<string | number>('unmasked');

const props = withDefaults(defineProps<Props & FormControlProps>(), {
  disabled: false,
  mask: () => ({}),
  ...formControlDefaults,
});

const formControlAttrs = useFormControlAttrs(props);

function onAccept(evt: CustomEvent) {
  const maskRef = evt.detail;
  maskedModel.value = maskRef.value;
  unmaskedModel.value = maskRef.unmaskedValue || undefined;
}
</script>

<template>
  <FormControl v-bind="formControlAttrs">
    <template #label>
      <slot></slot>
    </template>

    <template #default="{ id }">
      <input
        :id
        v-imask="mask"
        v-bind="$attrs"
        :value="masked"
        :disabled
        type="text"
        autocomplete="off"
        class="InputMask-Input"
        :class="{ invalid, disabled }"
        @accept="onAccept"
      />
    </template>
  </FormControl>
</template>

<style lang="scss" scoped>
.InputMask-Input {
  @apply w-full border border-slate-500 dark:border-slate-400 rounded px-3 py-2 z-2;
  @apply bg-white dark:bg-slate-800 leading-tight;
  @apply placeholder:text-slate-400 dark:placeholder:text-slate-500;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400;

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500/50 focus:border-red-500;
  }

  &.disabled {
    @apply cursor-not-allowed opacity-60;
  }
}
</style>
