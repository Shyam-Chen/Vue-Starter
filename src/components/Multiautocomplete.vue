<script lang="ts" setup>
import { ref, reactive, computed, nextTick } from 'vue';
import { useDebounceFn, onClickOutside } from '@vueuse/core';

import getScrollableParent from '~/utilities/getScrollableParent';
import request from '~/utilities/request';

import ChipField from './ChipField.vue';

const props = defineProps<{
  value: string[];
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: string[]): void;
  (evt: 'input', val: string): void;
}>();

const target = ref();
const autocompleteInput = ref();
const autocompletePane = ref();
const autocompleteItem = ref<any[]>([]);

const modelValue = computed({
  get: () => props.value || [],
  set: (val) => emit('update:value', val),
});

const debouncedFn = useDebounceFn(async (val) => {
  if (!val.length) return;

  const response = await request<any>('/suggestions', { query: { value: val } });

  nextTick(() => {
    flux.scrollableParent = getScrollableParent(autocompleteInput.value.$el);

    const rect = autocompleteInput.value.$el.getBoundingClientRect();

    autocompletePane.value.style.width = `${rect.width}px`;
    autocompletePane.value.style.left = `${rect.left}px`;
    autocompletePane.value.style.top = `${rect.bottom}px`;

    flux.show = true;
  });

  flux.options = response._data;
}, 333);

const flux = reactive({
  inputChipField(val: string) {
    debouncedFn(val);
  },

  show: false,
  direction: 'down',
  options: [] as any[],

  scrollableParent: null as HTMLElement | null,

  onSelect(value: string) {
    modelValue.value = [...modelValue.value, value];
    autocompleteInput.value.text = '';
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
      <ChipField ref="autocompleteInput" v-model:value="modelValue" @input="flux.inputChipField" />

      <Transition name="menu">
        <div
          v-show="flux.show"
          ref="autocompletePane"
          class="pane"
          :class="{
            'select-section-up': flux.direction === 'up',
          }"
        >
          <div ref="autocompleteList" class="list">
            <div
              v-for="(item, index) in flux.options"
              :ref="(el) => (autocompleteItem[index] = el)"
              :key="item.value"
              class="item"
              @click="flux.onSelect(item.value)"
            >
              {{ item.value }} - {{ item.label }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-enter-active {
  transition: opacity 0.3s ease-out;
}

.menu-leave-active {
  transition: opacity 0.3s ease-in;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.pane {
  @apply fixed z-10 shadow-lg rounded;
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
