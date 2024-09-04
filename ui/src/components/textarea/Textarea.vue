<script lang="ts" setup>
import type { TextareaHTMLAttributes } from 'vue';

import FormControl from '../form-control/FormControl.vue';

interface Props extends /* @vue-ignore */ TextareaHTMLAttributes {
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  rows?: number | string;
  invalid?: boolean | string;
  help?: string;
}

defineOptions({
  inheritAttrs: false,
});

const valueModel = defineModel<string>('value');

defineProps<Props>();
</script>

<template>
  <FormControl :label :required :invalid :help>
    <template #label>
      <slot></slot>
    </template>

    <template #default="{ id }">
      <div v-if="readonly">
        <textarea :id readonly class="hidden"></textarea>
        <div v-for="(item, index) in valueModel?.split('\n')" :key="index">{{ item }}</div>
      </div>

      <textarea
        v-else
        :id
        v-model="valueModel"
        v-bind="$attrs"
        :disabled="disabled"
        :rows="rows ? rows : '5'"
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
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400;

  &::placeholder {
    @apply text-zinc-500/50 dark:text-zinc-500;
  }

  &.disabled {
    @apply cursor-not-allowed opacity-60;
  }

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500/50 focus:border-red-500;
  }
}
</style>
