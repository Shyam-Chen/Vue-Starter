<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import { watch } from 'vue';

import FormControl from '../form-control/FormControl.vue';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string;
  type?: string;
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  pattern?: string;
  invalid?: boolean | string;
  help?: string;
  prepend?: string;
  append?: string;
}

defineOptions({
  inheritAttrs: false,
});

const valueModel = defineModel<string | number | string[]>('value');

const props = defineProps<Props>();

const emit = defineEmits<{
  (evt: 'clear'): void;
  (evt: 'prepend'): void;
  (evt: 'append'): void;
}>();

watch(
  () => valueModel.value,
  (val, oldVal) => {
    if (props.pattern && typeof val === 'string') {
      const regex = new RegExp(props.pattern);

      if (regex.test(val)) {
        valueModel.value = val;
      } else {
        if (val === '') {
          valueModel.value = val;
        } else {
          valueModel.value = oldVal;
        }
      }
    }
  },
);

function onClear() {
  valueModel.value = '';
  emit('clear');
}
</script>

<template>
  <FormControl :label :required :invalid :help>
    <template #label>
      <slot></slot>
    </template>

    <template #default="{ id }">
      <div class="relative w-full">
        <div v-if="prepend" class="TextField-Prepend" @click.stop="emit('prepend')">
          <div :class="prepend" class="w-5 h-5"></div>
        </div>

        <input
          :id
          v-model="valueModel"
          v-bind="$attrs"
          :type="type ? type : 'text'"
          :disabled="disabled"
          autocomplete="off"
          class="TextField-Input"
          :class="{ invalid, disabled, prepend, append, clearable }"
        />

        <div v-if="append" class="TextField-Append" @click.stop="emit('append')">
          <div :class="append" class="w-5 h-5"></div>
        </div>

        <div
          v-if="clearable && valueModel"
          class="i-material-symbols-close-small-rounded TextField-Clear"
          :class="{ prepend, append }"
          @click.stop="onClear"
        ></div>
      </div>
    </template>
  </FormControl>
</template>

<style lang="scss" scoped>
.TextField-Prepend {
  @apply absolute start-2 top-1/2 z-1 w-5 h-5 -translate-y-1/2;
}

.TextField-Input {
  @apply w-full border rounded px-3 py-2 leading-tight;
  @apply bg-white dark:bg-slate-800 border-slate-500 dark:border-slate-400;
  @apply placeholder:text-slate-400 dark:placeholder:text-slate-500;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400;

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500/40 focus:border-red-500;
  }

  &.disabled {
    @apply cursor-not-allowed opacity-60;
  }

  &.prepend {
    @apply ps-8;
  }

  &.append {
    @apply pe-8;
  }

  &.clearable {
    @apply pe-8;

    &.append {
      @apply pe-13;
    }
  }
}

.TextField-Append {
  @apply absolute end-2 top-1/2 z-1 w-5 h-5 -translate-y-1/2;
}

.TextField-Clear {
  @apply absolute end-2 top-1/2 z-99 w-5 h-5 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125;

  &.append {
    @apply end-8;
  }
}
</style>
