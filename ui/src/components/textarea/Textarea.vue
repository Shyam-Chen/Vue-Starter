<script lang="ts" setup>
import type { TextareaHTMLAttributes } from 'vue';

import FormControl, { type FormControlProps, formControlDefaults } from '../form-control';

interface Props extends /* @vue-ignore */ TextareaHTMLAttributes {
  disabled?: boolean;
  readonly?: boolean;
  viewonly?: boolean;
  rows?: number | string;
}

defineOptions({ inheritAttrs: false });

const valueModel = defineModel<string>('value');

withDefaults(defineProps<Props & FormControlProps>(), {
  disabled: false,
  readonly: false,
  viewonly: false,
  rows: '5',
  ...formControlDefaults,
});
</script>

<template>
  <FormControl :label :required :invalid :help>
    <template #label>
      <slot></slot>
    </template>

    <template #default="{ id }">
      <div v-if="viewonly">
        <textarea :id class="hidden"></textarea>
        <div v-for="(item, index) in valueModel?.split('\n')" :key="index">{{ item }}</div>
      </div>

      <textarea
        v-else
        :id
        v-model="valueModel"
        v-bind="$attrs"
        :disabled
        :readonly
        :rows
        wrap="hard"
        class="Textarea-Input"
        :class="{ disabled, invalid }"
      ></textarea>
    </template>
  </FormControl>
</template>

<style lang="scss" scoped>
.Textarea-Input {
  @apply w-full border border-slate-500 dark:border-slate-400 rounded px-3 py-2;
  @apply bg-white dark:bg-slate-800 leading-tight;
  @apply placeholder:text-zinc-500/50 dark:placeholder:text-zinc-500;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400;

  &.disabled {
    @apply cursor-not-allowed opacity-60;
  }

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500/50 focus:border-red-500;
  }
}
</style>
