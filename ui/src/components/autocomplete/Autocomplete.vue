<script lang="ts" setup>
import { nextTick, ref, computed, reactive } from 'vue';
import { useDebounceFn, onClickOutside } from '@vueuse/core';

import Fade from '../fade/Fade.vue';
import TextField from '../text-field/TextField.vue';
import useScrollParent from '../../composables/scroll-parent/useScrollParent';
import request from '../../utilities/request/request';

defineOptions({
  inheritAttrs: false,
});

const valueModel = defineModel<string>('value', { default: '' });

const props = withDefaults(
  defineProps<{
    options?: any[];
    display?: 'label' | 'value' | ((opt: any) => void);
    clearable?: boolean;
    notFoundContent?: string;
  }>(),
  {
    options: () => [],
    display: 'label',
    notFoundContent: 'No results found',
  },
);

const emit = defineEmits<{
  (evt: 'change', val: string | null, opt: any | null): void;
}>();

const target = ref<HTMLDivElement>();
const autocompleteInput = ref<typeof TextField>();
const autocompletePane = ref<HTMLDivElement>();
const autocompleteList = ref<HTMLDivElement>();
const autocompleteItem = ref<HTMLDivElement[]>([]);

const debouncedFn = useDebounceFn(async (val) => {
  if (!val.length) return;

  const response = await request<any>('/suggestions', { query: { value: val } });

  nextTick(() => {
    if (!autocompleteInput.value || !autocompletePane.value || !autocompleteList.value) return;

    const rect = autocompleteInput.value.$el.getBoundingClientRect();

    autocompletePane.value.style.width = `${rect.width}px`;
    autocompletePane.value.style.left = `${rect.left}px`;
    autocompletePane.value.style.top = `${rect.bottom}px`;

    if (autocompleteList.value.scrollWidth > autocompleteList.value.offsetWidth) {
      const width = `${autocompleteList.value.scrollWidth}px`;

      for (let index = 0; index < autocompleteItem.value.length; index++) {
        if (autocompleteItem.value[index]) {
          autocompleteItem.value[index].style.width = width;
        }
      }
    } else {
      for (let index = 0; index < autocompleteItem.value.length; index++) {
        if (autocompleteItem.value[index]) {
          autocompleteItem.value[index].style.width = '100%';
        }
      }
    }

    const center = window.innerHeight / 2;

    if (rect.top > center) {
      flux.direction = 'up';
    } else {
      flux.direction = 'down';
    }

    flux.show = true;
    flux.itemHoverIndex = -1;
  });

  flux.options = response._data;
}, 333);

const flux = reactive({
  onInput() {
    debouncedFn(valueModel.value);
  },
  onFocus() {
    if (valueModel.value && !flux.options?.length) {
      debouncedFn(valueModel.value);
    } else if (valueModel.value && flux.options?.length) {
      flux.show = true;

      nextTick(() => {
        if (!autocompleteList.value) return;

        const active = autocompleteList.value.querySelector(
          '.autocomplete-item-active',
        ) as HTMLDivElement;
        const offsetTop = active?.offsetTop;
        if (offsetTop) autocompleteList.value.scrollTop = offsetTop - active.offsetHeight * 2;
      });
    }
  },

  itemHoverIndex: -1,
  onDown() {
    if (!flux.show && !flux.options?.length) return;
    if (flux.itemHoverIndex === Number(flux.options?.length) - 1) return;
    flux.itemHoverIndex += 1;

    if (autocompleteList.value) {
      const hover = autocompleteList.value.querySelector(
        '.autocomplete-item-hover',
      ) as HTMLDivElement;
      const offsetTop = hover?.offsetTop;
      if (offsetTop) autocompleteList.value.scrollTop = offsetTop - hover.offsetHeight;
    }
  },
  onUp() {
    if (!flux.show && !flux.options?.length) return;
    if (flux.itemHoverIndex <= 0) return;
    flux.itemHoverIndex -= 1;

    if (autocompleteList.value) {
      const hover = autocompleteList.value.querySelector(
        '.autocomplete-item-hover',
      ) as HTMLDivElement;
      const offsetTop = hover?.offsetTop;
      if (offsetTop) autocompleteList.value.scrollTop = offsetTop - hover.offsetHeight * 3;
    }
  },
  onEnter() {
    flux.onSelect(flux.options?.[flux.itemHoverIndex]?.value, flux.options?.[flux.itemHoverIndex]);
  },

  onEsc() {
    flux.show = false;
  },

  show: false,
  direction: 'down',
  options: null as any[] | null,
  onSelect(value: any, option: any) {
    flux.show = false;
    valueModel.value = value;
    emit('change', value, option);
  },
  display(item: any) {
    if (props.display && typeof props.display === 'string') {
      return item[props.display];
    }

    if (props.display && typeof props.display === 'function') {
      return props.display(item);
    }

    return `${item.value} - ${item.label}`;
  },
  clear() {
    valueModel.value = '';
    emit('change', null, null);
  },
});

onClickOutside(target, () => {
  flux.show = false;
});

useScrollParent(
  computed(() => autocompletePane.value),
  () => {
    if (flux.show) {
      if (!autocompleteInput.value || !autocompletePane.value) return;
      const rect = autocompleteInput.value.$el.getBoundingClientRect();
      autocompletePane.value.style.width = `${rect.width}px`;
      autocompletePane.value.style.left = `${rect.left}px`;
      autocompletePane.value.style.top = `${rect.bottom}px`;
    }
  },
);
</script>

<template>
  <div class="w-full">
    <div ref="target" class="select">
      <TextField
        ref="autocompleteInput"
        v-bind="$attrs"
        v-model:value="valueModel"
        @focus="flux.onFocus"
        @input.stop="flux.onInput"
        @keyup.down.stop="flux.onDown"
        @keyup.up.stop="flux.onUp"
        @keyup.enter.stop="flux.onEnter"
        @keyup.esc.stop="flux.onEsc"
      />

      <Fade>
        <div
          v-show="flux.show"
          ref="autocompletePane"
          class="select-section shadow-lg rounded bg-white dark:bg-slate-800"
          :class="{
            'select-section-up': flux.direction === 'up',
          }"
        >
          <div ref="autocompleteList" class="select-menu">
            <div
              v-for="(item, index) in flux.options"
              :ref="(el) => (autocompleteItem[index] = el as HTMLDivElement)"
              :key="item.value"
              class="select-menu-item"
              :class="{
                'autocomplete-item-hover': index === flux.itemHoverIndex,
                'autocomplete-item-active': value === item.value,
              }"
              @mouseenter="flux.itemHoverIndex = index"
              @mouseleave="flux.itemHoverIndex = -1"
              @click="flux.onSelect(item.value, item)"
            >
              {{ flux.display(item) }}
            </div>
          </div>

          <div v-if="valueModel && flux.options?.length === 0" class="p-2">
            {{ notFoundContent }}
          </div>
        </div>
      </Fade>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select {
  @apply relative;

  $border: 1px;
  $height: 40px;

  &-section {
    @apply fixed w-full z-101;

    transform: translateY(0) translateY(8px) translateY(0);

    &-up {
      transform: translateY(-$border) translateY(-$height) translateY(-100%);
    }
  }

  &-menu {
    @apply cursor-pointer max-h-40 overflow-auto p-2 empty:hidden;

    &-item {
      @apply px-3 py-1 cursor-pointer rounded-md;
    }
  }
}

.autocomplete-item-hover,
.autocomplete-item-active {
  @apply text-primary-500 bg-primary-100 dark:text-primary-100 dark:bg-primary-600;
}
</style>
