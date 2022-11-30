<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<script lang="ts" setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

import getScrollableParent from '~/utilities/getScrollableParent';

import Checkbox from './Checkbox.vue';
import TextField from './TextField.vue';

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  display: {
    type: [String, Function],
    default: () => '',
  },
  placeholder: {
    type: String,
    default: 'Please select',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  disabled: {
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

const flux = reactive({
  show: false,
  direction: 'down',
  selected: [] as any[],
  filterValue: '',
  options: [] as any[],
  onSelect(value: any, option: any, filterEl: any) {
    flux.options = [..._initOptions.value].map((item) => {
      if (item.value === value) {
        return { ...item, checked: !option.checked };
      }

      return { ...item, checked: props.value?.includes(item.value) };
    });

    flux.filterValue = '';
    if (filterEl) {
      filterEl.focus();
    }

    flux.selected = flux.options.filter((item) => item.checked);

    emit(
      'update:value',
      flux.selected.map((item) => item.value),
    );
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

const target = ref();
const select = ref();
const menu = ref();
const selectMenu = ref();
const selectMenuItem = ref<any[]>([]);

const _initOptions = computed<any[]>(() => props.options);

const reoptions = computed<any[]>(() => {
  if (props.value?.length) {
    const opts = props.options?.map((item: any) => ({
      ...item,
      checked: props.value.includes(item.value),
    }));
    flux.selected = opts.filter((item) => item.checked);
    flux.options = opts;
    return opts;
  }

  const opts = props.options?.map((item: any) => ({ ...item, checked: false }));
  flux.selected = [];
  flux.options = opts;
  return opts;
});

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
        selectMenuItem.value[index].style.width = width;
      }
    } else {
      for (let index = 0; index < selectMenuItem.value.length; index++) {
        selectMenuItem.value[index].style.width = '100%';
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
    const arr = [..._initOptions.value]?.map((item) => ({
      ...item,
      checked: props.value.includes(item.value),
    }));

    const filter = arr.filter(
      (item) =>
        item.label.toUpperCase().includes(val.toUpperCase()) ||
        item.value.toUpperCase().includes(val.toUpperCase()),
    );

    flux.options = filter;
  },
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
  <div class="w-full">
    <div ref="target" class="select">
      <div
        ref="select"
        class="select-input flex items-center border border-slate-400 rounded w-full py-2 px-3 text-slate-700 bg-white leading-tight"
        :class="{
          'select-input-placeholder important:text-gray-400': !flux.selected?.length,
          'select-input-focus important:border-blue-600': flux.show,
          'select-error important:border-red-500 mb-1': isInvalid || errorMessage,
          'select-input-error-focus': (isInvalid || errorMessage) && flux.show,
          'select-disabled opacity-50 cursor-not-allowed': disabled,
        }"
        @click="open($refs.select, $refs.filter, $refs.menu)"
      >
        <template v-if="!flux.selected?.length">
          {{ placeholder }}
        </template>

        <div v-if="flux.selected?.length" class="flex flex-wrap gap-1">
          <div
            v-for="item in flux.selected"
            :key="item.value"
            class="text-xs rounded inline-block whitespace-nowrap text-center bg-blue-600 text-white"
            style="padding: 1.5px 0.5rem"
            :class="{ disabled: disabled }"
          >
            {{ flux.display(item) }}
          </div>
        </div>

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

      <Transition name="menu">
        <div
          v-show="flux.show"
          ref="menu"
          class="select-section shadow-lg rounded bg-white"
          :class="{
            'select-section-up': flux.direction === 'up',
          }"
        >
          <div v-if="filterable" class="select-filter">
            <TextField ref="filter" v-model:value="flux.filterValue" />
          </div>

          <div ref="selectMenu" class="select-menu">
            <div
              v-for="(item, index) in flux.options"
              :ref="(el) => (selectMenuItem[index] = el)"
              :key="item.value"
              class="flex items-center select-menu-item hover:bg-gray-300"
              :class="{
                'select-menu-item-active': value === item.value,
              }"
              @click="flux.onSelect(item.value, item, $refs.filter)"
            >
              <Checkbox v-model:value="item.checked" class="align-self-start" />
              <span class="ml-2">{{ flux.display(item) }}</span>
            </div>
          </div>

          <div v-if="reoptions.length === 0" class="select-content">
            {{ notFoundContent }}
          </div>
        </div>
      </Transition>
    </div>

    <div v-if="errorMessage" class="text-danger mt-1">
      {{ errorMessage }}
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

.select {
  $border: 1px;
  $height: 40px;
  position: relative;

  &-input {
    // cursor: pointer;
    // width: auto;
    min-height: 38px;
    // padding: 0.25rem 0.75rem;
    // border-radius: 2px;
    // background: #e4ebf0;
    // box-shadow: inset 3px 3px 6px #c2c8cc, inset -3px -3px 6px #ffffff;
    // border: 0.0625rem solid #d1d9e6;
    position: relative;
    // display: flex;
    // align-items: center;
    // line-height: 14px;

    &:hover .select-input-icon-clear {
      visibility: visible;
    }

    &-placeholder {
      color: #6c757d;
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

      &:hover {
        // background-color: #e4ebf0;
      }

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

  &-error {
    line-height: 16px;
    color: #f46155;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
  }
}
</style>
