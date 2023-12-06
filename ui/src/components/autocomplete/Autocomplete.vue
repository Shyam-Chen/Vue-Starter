<script lang="ts" setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useDebounceFn, onClickOutside } from '@vueuse/core';

import scrollableParent from '../../utilities/scrollable-parent/scrollableParent';
import request from '../../utilities/request/request';

import TextField from '../text-field/TextField.vue';
import Fade from '../fade/Fade.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    value?: string;
    options?: any[];
    display?: 'label' | 'value' | ((opt: any) => void);
    clearable?: boolean;
    notFoundContent?: string;
  }>(),
  {
    value: '',
    options: () => [],
    display: 'label',
    notFoundContent: 'No results found',
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val: string | null): void;
  (evt: 'change', val: string | null, opt: any | null): void;
}>();

const target = ref();
const autocompleteInput = ref();
const autocompletePane = ref();
const autocompleteList = ref();
const autocompleteItem = ref<any[]>([]);

const modelValue = computed({
  get: () => props.value,
  set(val) {
    emit('update:value', val);
  },
});

const debouncedFn = useDebounceFn(async (val) => {
  if (!val.length) return;

  const response = await request<any>('/suggestions', { query: { value: val } });

  nextTick(() => {
    flux.scrollableParent = scrollableParent(autocompleteInput.value.$el);

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
    debouncedFn(modelValue.value);
  },
  onFocus() {
    if (modelValue.value && !flux.options?.length) {
      debouncedFn(modelValue.value);
    } else if (modelValue.value && flux.options?.length) {
      flux.show = true;

      nextTick(() => {
        const active = autocompleteList.value.querySelector('.autocomplete-item-active');
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

    const hover = autocompleteList.value.querySelector('.autocomplete-item-hover');
    const offsetTop = hover?.offsetTop;
    if (offsetTop) autocompleteList.value.scrollTop = offsetTop - hover.offsetHeight;
  },
  onUp() {
    if (!flux.show && !flux.options?.length) return;
    if (flux.itemHoverIndex <= 0) return;
    flux.itemHoverIndex -= 1;

    const hover = autocompleteList.value.querySelector('.autocomplete-item-hover');
    const offsetTop = hover?.offsetTop;
    if (offsetTop) autocompleteList.value.scrollTop = offsetTop - hover.offsetHeight * 3;
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
    emit('update:value', value);
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
    emit('update:value', null);
    emit('change', null, null);
  },

  scrollableParent: null as HTMLElement | null,
});

onClickOutside(target, () => {
  flux.show = false;
});

const wrapper = computed(() => flux.scrollableParent);

const handleScroll = () => {
  if (flux.show) {
    const rect = autocompleteInput.value.$el.getBoundingClientRect();
    autocompletePane.value.style.width = `${rect.width}px`;
    autocompletePane.value.style.left = `${rect.left}px`;
    autocompletePane.value.style.top = `${rect.bottom}px`;
  }
};

watch(
  () => wrapper.value,
  (el) => {
    el?.addEventListener('scroll', handleScroll);
  },
);

onMounted(() => {
  if (wrapper.value && wrapper.value instanceof HTMLElement) {
    wrapper.value?.addEventListener('scroll', handleScroll);
  } else {
    window.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (wrapper.value && wrapper.value instanceof HTMLElement) {
    wrapper.value?.removeEventListener('scroll', handleScroll);
  } else {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <div class="w-full">
    <div ref="target" class="select">
      <TextField
        ref="autocompleteInput"
        v-bind="$attrs"
        v-model:value="modelValue"
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
              :ref="(el) => (autocompleteItem[index] = el)"
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

          <div v-if="modelValue && flux.options?.length === 0" class="p-2">
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
    @apply fixed w-full z-10;

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
