<script lang="ts" setup>
import { ref, computed, reactive, watch } from 'vue';

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
  onClick() {
    input.value?.focus();
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
</script>

<template>
  <div
    class="flex flex-wrap gap-1 bg-white border border-slate-400 rounded w-full px-3 text-slate-700 leading-tight"
    :class="[
      value?.length ? 'py-1.5' : 'py-2',
      {
        'border-blue-600': true,
        'opacity-50	cursor-not-allowed': disabled,
      },
    ]"
    @click="flux.onClick"
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
      class="outline-none w-fit"
      :class="{ 'cursor-not-allowed': disabled }"
      :placeholder="placeholder"
      :disabled="disabled"
      @input.stop="emit('input', flux.text)"
      @keyup.enter="flux.onEnter"
      @keyup.delete="flux.onDelete"
    />
  </div>
</template>
