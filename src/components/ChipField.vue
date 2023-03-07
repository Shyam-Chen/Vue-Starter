<script lang="ts" setup>
import { ref, computed, reactive, watch, toRef } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

import Chip from './Chip.vue';

const props = defineProps<{
  value?: string[];
  placeholder?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: string[]): void;
  (evt: 'input', val: string): void;
}>();

const chipFieldValue = computed({
  get: () => props.value || [],
  set: (val) => emit('update:value', val),
});

const input = ref();

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
    const chips = [...chipFieldValue.value];
    chips.splice(idx, 1);
    chipFieldValue.value = chips;
  },
  onEnter() {
    if (flux.text) {
      chipFieldValue.value = [...chipFieldValue.value, flux.text];
      flux.text = '';
      flux.backspace = true;
    }
  },
  onDelete() {
    if (!flux.text && flux.backspace) {
      const chips = [...chipFieldValue.value];
      chips.pop();
      chipFieldValue.value = chips;
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
  <div
    v-on-click-outside="flux.onBlur"
    class="flex flex-wrap gap-1 bg-white dark:bg-slate-800 border border-slate-400 rounded w-full px-3 leading-tight"
    :class="[
      value?.length ? 'py-1.5' : 'py-2',
      {
        'important:(ring-1 ring-primary-400 border-primary-400)': flux.focused,
        'opacity-70	cursor-not-allowed': disabled,
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
      ref="input"
      v-model="flux.text"
      class="outline-none w-fit bg-inherit"
      :class="{ 'cursor-not-allowed': disabled }"
      :placeholder="placeholder"
      :disabled="disabled"
      @input.stop="emit('input', flux.text)"
      @keyup.enter="flux.onEnter"
      @keyup.delete="flux.onDelete"
    />
  </div>
</template>
