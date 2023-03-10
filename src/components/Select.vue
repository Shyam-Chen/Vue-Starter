<script lang="ts" setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

import getScrollableParent from '~/utilities/getScrollableParent';

import TextField from './TextField.vue';
import FadeTransition from './FadeTransition.vue';

type Option = { label: string; value: string | number; [key: string]: unknown; options?: Options };
type Options = Option[];

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: Option['value'];
    options?: Options;
    display?: 'label' | 'value' | ((opt: Option) => void);
    placeholder?: string;
    clearable?: boolean;
    filterable?: boolean;
    disabled?: boolean;
    notFoundContent?: string;
    isInvalid?: boolean;
    errorMessage?: string;
  }>(),
  {
    label: '',
    value: undefined,
    options: () => [],
    display: 'label',
    placeholder: 'Please select',
    clearable: false,
    filterable: false,
    disabled: false,
    notFoundContent: '--',
    isInvalid: false,
    errorMessage: '',
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val: string | number | null): void;
  (evt: 'change', val: string | number | null, opt: Option | null): void;
}>();

const flux = reactive({
  show: false,
  direction: 'down',
  selected: undefined as Option | undefined,
  filterValue: '',
  options: undefined as Options | undefined,
  onSelect(value: Option['value'], option: Option) {
    flux.show = false;
    emit('update:value', value);
    emit('change', value, option);
  },
  display(item: Option) {
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

const target = ref();
const select = ref();
const menu = ref();
const selectMenu = ref();
const selectMenuItem = ref<any[]>([]);

const _initOptions = computed(() => props.options);
const reoptions = computed(() => flux.options || props.options);

const open = (selectEl: any, filterEl: any, menuEl: any) => {
  if (props.disabled) return;

  flux.show = !flux.show;

  nextTick(() => {
    flux.scrollableParent = getScrollableParent(selectEl);

    const rect = selectEl.getBoundingClientRect();

    menuEl.style.width = `${rect.width}px`;
    menuEl.style.left = `${rect.left}px`;
    menuEl.style.top = `${rect.bottom}px`;

    if (selectMenu.value.scrollWidth > selectMenu.value.offsetWidth) {
      const width = `${selectMenu.value.scrollWidth}px`;

      for (let index = 0; index < selectMenuItem.value.length; index++) {
        if (selectMenuItem.value[index]) {
          selectMenuItem.value[index].style.width = width;
        }
      }
    } else {
      for (let index = 0; index < selectMenuItem.value.length; index++) {
        if (selectMenuItem.value[index]) {
          selectMenuItem.value[index].style.width = '100%';
        }
      }
    }

    const center = window.innerHeight / 2;

    if (rect.top > center) {
      flux.direction = 'up';
    } else {
      flux.direction = 'down';
    }

    const active = menuEl.querySelector('.select-menu-item-active');
    const offsetTop = active?.offsetTop;
    if (offsetTop) {
      selectMenu.value.scrollTop = offsetTop - active.offsetHeight * 2;
    }

    if (filterEl) {
      filterEl.$el.querySelector('input').focus();
    }
  });
};

onClickOutside(target, () => {
  flux.show = false;
});

watch(
  () => flux.filterValue,
  (val) => {
    const arr = [..._initOptions.value];

    const filter = arr.filter(
      (item) =>
        item.label.toUpperCase().includes(val.toUpperCase()) ||
        String(item.value).toUpperCase().includes(val.toUpperCase()),
    );

    flux.options = filter;
  },
);

watch(
  () => props.value,
  (val) => {
    if (val) {
      const arr = [..._initOptions.value];
      const found = arr.find((item) => item.value === val);
      flux.selected = found;
    } else {
      flux.selected = undefined;
    }
  },
  { immediate: true },
);

const wrapper = computed(() => flux.scrollableParent);

const handleScroll = () => {
  if (flux.show) {
    const rect = select.value.getBoundingClientRect();
    menu.value.style.width = `${rect.width}px`;
    menu.value.style.left = `${rect.left}px`;
    menu.value.style.top = `${rect.bottom}px`;
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
  <div class="flex flex-col w-full">
    <label class="text-sm font-bold mb-2 empty:hidden">
      {{ label }}
    </label>

    <div ref="target" class="select">
      <div
        ref="select"
        class="select-input cursor-pointer border border-slate-400 rounded w-full py-2 px-3 bg-white dark:bg-slate-800 leading-tight"
        :class="{
          'select-placeholder important:text-gray-400': !flux.selected,
          'select-focus important:border-blue-600': flux.show,
          'select-error important:border-red-500 mb-1': isInvalid || errorMessage,
          'select-error-focus important:border-rose-500': (isInvalid || errorMessage) && flux.show,
          'select-disabled opacity-50 cursor-not-allowed': disabled,
        }"
        @click="open($refs.select, $refs.filter, $refs.menu)"
      >
        <template v-if="!flux.selected">
          {{ placeholder }}
        </template>

        <template v-if="flux.selected">
          {{ flux.display(flux.selected) }}
        </template>

        <div
          v-if="value && clearable && !disabled"
          class="select-input-icon select-input-icon-clear"
          @click.stop="flux.clear"
        >
          <div class="i-fa-times-circle w-4 h-4"></div>
        </div>

        <div v-if="!flux.show" class="i-fa-caret-down w-4 h-4 select-input-icon"></div>
        <div v-else class="i-fa-caret-up w-4 h-4 select-input-icon"></div>
      </div>

      <FadeTransition>
        <div
          v-show="flux.show"
          ref="menu"
          class="select-section shadow-lg rounded bg-white dark:bg-slate-800"
          :class="{
            'select-section-up': flux.direction === 'up',
          }"
        >
          <div v-if="filterable" class="select-filter">
            <TextField ref="filter" v-model:value="flux.filterValue" />
          </div>

          <div ref="selectMenu" class="select-menu">
            <div
              v-for="(item, index) in reoptions"
              :ref="(el) => (selectMenuItem[index] = el)"
              :key="item.value"
              class="select-menu-item hover:bg-gray-300 dark:hover:bg-slate-700"
              :class="{
                'bg-blue-600 text-white important:hover:bg-blue-800': value === item.value,
              }"
              @click="flux.onSelect(item.value, item)"
            >
              {{ flux.display(item) }}
            </div>
          </div>

          <div v-if="reoptions.length === 0" class="select-content">
            {{ notFoundContent }}
          </div>
        </div>
      </FadeTransition>
    </div>

    <div v-if="errorMessage" class="text-red-500 text-xs">
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
    position: relative;
    padding-right: 2rem;

    &:hover .select-input-icon-clear {
      visibility: visible;
    }

    &-placeholder {
      // color: #6c757d;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 1rem;
    }

    &-icon-clear {
      background: #fff;
      z-index: 100;
      visibility: hidden;
      color: #6c757d;
      width: auto;
      height: auto;

      &:hover {
        color: #555;
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

      &-active {
        // color: #fff;
        background-color: var(--primary);
        // background-color: transparent;
        // box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;

        &:hover {
          // color: #fff;
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
}
</style>
