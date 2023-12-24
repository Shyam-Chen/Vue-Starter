<script lang="ts" setup>
import type { TextareaHTMLAttributes } from 'vue';
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

interface Props extends /* @vue-ignore */ TextareaHTMLAttributes {
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  rows?: string;
  invalid?: boolean | string;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
}>();

const uid = uniqueId('uid-');

const valueModel = computed({
  get: () => props.value || '',
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="Textarea" :class="[disabled ? 'opacity-60' : '']">
    <label :for="uid" class="Textarea-Label">
      <template v-if="label">{{ label }}</template>
      <span v-if="required" class="text-red-500">*</span>
      <slot></slot>
    </label>

    <div v-if="readonly">
      <textarea :id="uid" readonly class="hidden"></textarea>

      <div v-for="(item, index) in valueModel?.split('\n')" :key="index">
        {{ item }}
      </div>
    </div>

    <textarea
      v-else
      :id="uid"
      v-model="valueModel"
      v-bind="$attrs"
      :disabled="disabled"
      :rows="rows ? rows : '5'"
      wrap="hard"
      class="Textarea-Input"
      :class="{ disabled, invalid }"
    ></textarea>

    <div v-if="invalid && typeof invalid === 'string'" class="text-red-500 text-xs mt-1">
      {{ invalid }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Textarea {
  @apply flex flex-col w-full;
}

.Textarea-Label {
  @apply text-sm font-bold mb-2 empty:hidden;
}

.Textarea-Input {
  @apply w-full border border-slate-400 dark:border-slate-500 rounded px-3 py-2;
  @apply bg-white dark:bg-slate-800 leading-tight;
  @apply focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400;

  &::placeholder {
    @apply text-zinc-500/50 dark:text-zinc-500;
  }

  &.disabled {
    @apply cursor-not-allowed;
  }

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500 focus:border-red-500;
  }
}
</style>
