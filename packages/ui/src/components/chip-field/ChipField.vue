<script lang="ts" setup>
import { ref, reactive, watch, toRef } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

import FormControl from '../form-control/FormControl.vue';
import Chip from '../chip/Chip.vue';

defineOptions({
  inheritAttrs: false,
});

const valueModel = defineModel<string[]>('value', { default: [] });

defineProps<{
  label?: string;
  required?: boolean;
  invalid?: boolean | string;
  help?: string;
  placeholder?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'input', val: string): void;
}>();

const input = ref<HTMLInputElement>();

const flux = reactive({
  text: '',
  backspace: false,
  focused: false,
  onFocus() {
    flux.focused = true;
    input.value?.focus();
  },
  onBlur() {
    flux.focused = false;
    input.value?.blur();
  },
  onClose(idx: number) {
    const chips = [...valueModel.value];
    chips.splice(idx, 1);
    valueModel.value = chips;
  },
  onEnter() {
    if (flux.text) {
      valueModel.value = [...valueModel.value, flux.text];
      flux.text = '';
      flux.backspace = true;
    }
  },
  onDelete() {
    if (!flux.text && flux.backspace) {
      const chips = [...valueModel.value];
      chips.pop();
      valueModel.value = chips;
    }

    if (!flux.text) {
      flux.backspace = true;
    }
  },
});

watch(
  () => flux.text,
  (val, oldVal) => {
    if (!val && !oldVal) flux.backspace = true;
    if (val) flux.backspace = false;
  },
  { immediate: true },
);

defineExpose({
  text: toRef(flux, 'text'),
});
</script>

<template>
  <FormControl v-slot="{ uid }" :label="label" :required="required" :invalid="invalid" :help="help">
    <div
      v-on-click-outside="flux.onBlur"
      class="ChipField"
      :class="[
        value?.length ? 'py-1.5' : 'py-2',
        {
          focused: flux.focused,
          invalid,
          disabled,
        },
      ]"
      @click="flux.onFocus"
    >
      <Chip
        v-for="(val, idx) in value"
        :key="val"
        closable
        :disabled="disabled"
        @close="flux.onClose(idx)"
      >
        {{ val }}
      </Chip>

      <input
        :id="uid"
        ref="input"
        v-model="flux.text"
        v-bind="$attrs"
        class="outline-none w-fit bg-inherit"
        :class="{ 'cursor-not-allowed': disabled }"
        :placeholder="placeholder"
        :disabled="disabled"
        @input.stop="emit('input', flux.text)"
        @keyup.enter="flux.onEnter"
        @keyup.delete="flux.onDelete"
      />
    </div>
  </FormControl>
</template>

<style lang="scss" scoped>
.ChipField {
  @apply flex flex-wrap gap-1 bg-white dark:bg-slate-800 border border-slate-400 rounded w-full px-3 leading-tight;

  &.focused {
    @apply ring-2 ring-primary-500/50 border-primary-400;
  }

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500/40 focus:border-red-500;
  }

  &.disabled {
    @apply cursor-not-allowed opacity-60;
  }
}
</style>
