<script lang="ts" setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useDebounceFn, onClickOutside } from '@vueuse/core';

import { useFetch } from '~/composables';
import getScrollableParent from '~/utilities/getScrollableParent';

import TextField from './TextField.vue';
import Fade from './Fade.vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  display: {
    type: [String, Function],
    default: () => '',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  notFoundContent: {
    type: String,
    default: '--',
  },
  isInvalid: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value', 'change']);

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

const suggestionsApi = useFetch(
  computed(() => '/suggestions?' + new URLSearchParams({ value: modelValue.value }).toString()),
).json();

const debouncedFn = useDebounceFn(async (val) => {
  if (!val.length) return;

  await suggestionsApi.get().execute();

  nextTick(() => {
    flux.scrollableParent = getScrollableParent(autocompleteInput.value.$el);

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

    // const active = autocompleteList.querySelector('.select-menu-item-active')
    // const offsetTop = active?.offsetTop
    // if (offsetTop) { selectMenu.value.scrollTop = offsetTop - active.offsetHeight * 2 }

    // console.log(autocompleteInput.value.$el);

    flux.show = true;
    flux.itemHoverIndex = -1;
  });

  flux.options = suggestionsApi.data.value || [];
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
    }
  },

  itemHoverIndex: -1,
  onDown() {
    if (!flux.show && !flux.options?.length) return;
    if (flux.itemHoverIndex === flux.options?.length) return;

    flux.itemHoverIndex += 1;
    const hover = autocompleteList.value.querySelector('.select-menu-item-hover');
    const offsetTop = hover?.offsetTop;
    if (offsetTop) {
      autocompleteList.value.scrollTop = offsetTop - hover.offsetHeight;
    }
  },
  onUp() {
    if (!flux.show && !flux.options?.length) return;
    if (flux.itemHoverIndex === -1) return;

    flux.itemHoverIndex -= 1;
    const hover = autocompleteList.value.querySelector('.select-menu-item-hover');
    const offsetTop = hover?.offsetTop;
    if (offsetTop) {
      autocompleteList.value.scrollTop = offsetTop - hover.offsetHeight * 3;
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

// watch(
//   () => modelValue.value,
//   (val) => {
//     debouncedFn(val);
//   },
//   { immediate: true },
// );

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
        :invalid="!!errorMessage"
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
          class="select-section shadow-lg rounded bg-white"
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
                // 'bg-blue-600 text-white': value === item.value,
                'select-menu-item-hover': index === flux.itemHoverIndex,
              }"
              @mouseenter="flux.itemHoverIndex = index"
              @mouseleave="flux.itemHoverIndex = -1"
              @click="flux.onSelect(item.value, item)"
            >
              {{ flux.display(item) }}
            </div>
          </div>
        </div>
      </Fade>
    </div>

    <div v-if="errorMessage" class="text-danger mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select {
  $border: 1px;
  $height: 40px;
  position: relative;

  &-input {
    cursor: pointer;
    width: 100%;
    min-height: 30px;
    padding: 0.25rem 0.75rem;
    border-radius: 2px;
    background: #e4ebf0;
    box-shadow: inset 3px 3px 6px #c2c8cc, inset -3px -3px 6px #ffffff;
    border: 0.0625rem solid #d1d9e6;
    position: relative;
    display: flex;
    align-items: center;
    line-height: 14px;

    &:hover .select-input-icon-clear {
      visibility: visible;
    }

    &-placeholder {
      color: #6c757d;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-focus {
      border: 0.0625rem solid var(--primary);
    }

    &-error {
      border-color: var(--danger);
    }

    &-error-focus {
      border-color: var(--danger);
      // box-shadow: 0 0 0 0.2rem #ccc;
    }

    &-disabled {
      cursor: not-allowed;
      border-radius: 2px;
      color: #c4c4c4;
      background: #c4c4c4;
      box-shadow: inset 3px 3px 6px #a7a7a7, inset -3px -3px 6px #e1e1e1;
    }

    &-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 1rem;
    }

    &-icon-clear {
      background: #e4ebf0;
      z-index: 100;
      visibility: hidden;
      color: #6c757d;

      &:hover {
        color: #6c757d;
      }
    }
  }

  &-section {
    position: fixed;
    // background: #e4ebf0;
    width: 100%;
    z-index: 10;
    // font-size: 14px;
    // border: 0.0625rem solid #d1d9e6;
    // border-radius: 0.55rem;
    // box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #fff;
    transform: translateY(0) translateY(8px) translateY(0);

    &-up {
      // box-shadow: 0 -2px 8px #ccc;
      transform: translateY(-$border) translateY(-$height) translateY(-100%);
    }
  }

  &-filter {
    width: 100%;
    padding: 0.6rem;

    &-input {
      width: 100%;
      padding: 0.1rem 0.6rem;
      font-size: 14px;
      color: #222;
      height: 30px;
      border-radius: 2px;
      background: #e4ebf0;
      box-shadow: inset 3px 3px 6px #c2c8cc, inset -3px -3px 6px #ffffff;
      border: 0.0625rem solid #d1d9e6;
      padding: 0 0.75rem;
      outline: none;

      &:focus {
        border: 0.0625rem solid #007bff;
      }
    }
  }

  &-menu {
    // background: #e4ebf0;
    width: 100%;
    max-height: 10rem;
    overflow: auto;
    color: rgba(0, 0, 0, 0.85);
    margin: 0.55rem 0;
    text-align: left;
    cursor: pointer;

    &:empty {
      display: none;
    }

    &-item {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      min-height: 32px;
      padding: 5px 12px;

      // &:hover {
      //   background: #e4ebf0 - #222;
      // }

      &-hover {
        background: #e4ebf0;
      }

      &-active {
        color: #fff;
        background-color: var(--primary);
        // background-color: transparent;
        // box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;

        &:hover {
          color: #fff;
          background-color: var(--primary);
          // box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;
        }
      }
    }
  }

  &-content {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    min-height: 32px;
    padding: 5px 12px;
  }

  &-error {
    line-height: 16px;
    color: #f46155;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
  }
}
</style>
