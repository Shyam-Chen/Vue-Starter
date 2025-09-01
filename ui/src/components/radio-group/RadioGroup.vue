<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';

import FormControl, { type FormControlProps, formControlDefaults } from '../form-control';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  options?: string[] | { label: string; value: unknown; [key: string]: unknown }[];
  disabled?: boolean;
}

defineOptions({ inheritAttrs: false });

const valueModel = defineModel<unknown>('value');

withDefaults(defineProps<Props & FormControlProps>(), {
  options: () => [],
  disabled: false,
  ...formControlDefaults,
});

const emit = defineEmits<(evt: 'change', val: unknown) => void>();
</script>

<template>
  <FormControl v-slot="{ id }" :label :required :invalid :help class="RadioGroup">
    <div class="flex flex-wrap items-center gap-4 min-h-9.5">
      <label
        v-for="(item, index) in options"
        :key="index"
        :for="`${id}-${index}`"
        class="flex items-center"
        :class="[disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer']"
      >
        <div class="relative flex justify-center items-center">
          <input
            :id="`${id}-${index}`"
            v-model="valueModel"
            v-bind="$attrs"
            type="radio"
            :name="id"
            :value="typeof item === 'object' ? item.value : item"
            :disabled
            class="RadioGroup-Input"
            :class="{ invalid }"
            @change="emit('change', valueModel)"
          />

          <div
            class="absolute select-none size-3.5 text-primary-500"
            :class="{
              'i-mdi-circle': valueModel === (typeof item === 'object' ? item.value : item),
            }"
          ></div>
        </div>

        <div class="ms-2">
          {{ typeof item === 'object' ? item.label : item }}
        </div>
      </label>
    </div>
  </FormControl>
</template>

<style lang="scss" scoped>
.RadioGroup-Input {
  @apply appearance-none size-5 rounded-full border overflow-hidden;
  @apply bg-white dark:bg-slate-800 border-slate-500 dark:border-slate-400;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400;

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500/40 focus:border-red-500;
  }
}
</style>
