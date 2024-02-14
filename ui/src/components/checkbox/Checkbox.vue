<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  value?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  invalid?: boolean | string;
  disabled?: boolean;
  readonly?: boolean;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();

const emit = defineEmits<{
  (evt: 'update:value', val: boolean): void;
}>();

const valueModel = computed({
  get: () => props.value || false,
  set: (val) => !props.readonly && emit('update:value', val),
});

const uid = uniqueId('uid-');
</script>

<template>
  <div class="Checkbox-Wrapper">
    <label class="Checkbox-Label" :class="{ disabled, readonly }">
      <div class="Checkbox-Container">
        <input
          :id="uid"
          v-model="valueModel"
          v-bind="$attrs"
          type="checkbox"
          :disabled="disabled"
          :readonly="readonly"
          class="Checkbox-Input"
          :class="{ hasValue: value || checked || indeterminate, invalid }"
        />

        <div
          class="Checkbox-Icon"
          :class="[
            indeterminate
              ? 'i-material-symbols-check-indeterminate-small-rounded'
              : value || checked
                ? 'i-material-symbols-check-small-rounded'
                : '',
          ]"
        ></div>
      </div>

      <div class="Checkbox-Text">
        <slot></slot>
      </div>
    </label>

    <div v-if="typeof invalid === 'string' && invalid" class="text-red-500 text-xs mt-1">
      {{ invalid }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Checkbox-Wrapper {
  @apply inline-flex flex-col;
}

.Checkbox-Label {
  @apply flex items-center min-h-38px cursor-pointer;

  &.disabled {
    @apply cursor-not-allowed opacity-60;
  }

  &.readonly {
    @apply cursor-default;
  }
}

.Checkbox-Container {
  @apply relative flex justify-center items-center;
}

.Checkbox-Input {
  @apply appearance-none w-5 h-5 rounded border border-slate-400 dark:border-slate-600 overflow-hidden;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:shadow-lg;
  @apply bg-white;

  &.hasValue {
    @apply bg-primary-500;
  }

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500/50 focus:border-red-500;
  }
}

.Checkbox-Icon {
  @apply absolute select-none w-6 h-6 text-white;
}

.Checkbox-Text {
  @apply ml-2 empty:hidden;
}
</style>
