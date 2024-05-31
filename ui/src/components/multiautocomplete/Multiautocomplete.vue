<script lang="ts" setup>
import { onClickOutside, useDebounceFn } from '@vueuse/core';
import { nextTick, reactive, ref } from 'vue';

// import useScrollParent from '../../composables/scroll-parent/useScrollParent';
import request from '../../utilities/request/request';

import type ChipField from '../chip-field/ChipField.vue';
import Fade from '../fade/Fade.vue';

const valueModel = defineModel<string[]>('value', { default: [] });

defineEmits<(evt: 'input', val: string) => void>();

const target = ref<HTMLDivElement>();
const autocompleteInput = ref<typeof ChipField>();
const autocompletePane = ref<HTMLDivElement>();
const autocompleteItem = ref<HTMLDivElement[]>([]);

const debouncedFn = useDebounceFn(async (val) => {
  if (!val.length) return;

  const response = await request<any>('/suggestions', { query: { value: val } });

  await nextTick();

  if (autocompleteInput.value) {
    const rect = autocompleteInput.value.$el.getBoundingClientRect();

    if (autocompletePane.value) {
      autocompletePane.value.style.width = `${rect.width}px`;
      autocompletePane.value.style.left = `${rect.left}px`;
      autocompletePane.value.style.top = `${rect.bottom}px`;
    }
  }

  flux.show = true;

  flux.options = response._data;
}, 333);

const flux = reactive({
  inputChipField(val: string) {
    debouncedFn(val);
  },

  show: false,
  direction: 'down',
  options: [] as any[],

  onSelect(value: string) {
    valueModel.value = [...valueModel.value, value];
    if (autocompleteInput.value) autocompleteInput.value.text = '';
    flux.show = false;
  },
});

onClickOutside(target, () => {
  flux.show = false;
});
</script>

<template>
  <div class="w-full">
    <div ref="target" class="relative">
      <ChipField ref="autocompleteInput" v-model:value="valueModel" @input="flux.inputChipField" />

      <Fade>
        <div
          v-show="flux.show"
          ref="autocompletePane"
          class="pane"
          :class="{
            'select-section-up': flux.direction === 'up',
          }"
        >
          <div class="list">
            <div
              v-for="(item, index) in flux.options"
              :ref="(el) => (autocompleteItem[index] = el as HTMLDivElement)"
              :key="item.value"
              class="item"
              @click="flux.onSelect(item.value)"
            >
              {{ item.value }} - {{ item.label }}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pane {
  @apply fixed z-101 shadow-lg rounded;
  @apply bg-white dark:bg-slate-800;

  transform: translateY(0) translateY(8px) translateY(0);
}

.list {
  @apply max-h-40 overflow-auto px-1 py-2;
}

.item {
  @apply px-3 py-1 cursor-pointer hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600 hover:rounded-md;
}
</style>
