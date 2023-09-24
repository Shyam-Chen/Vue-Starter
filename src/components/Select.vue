<script lang="ts" setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

import getScrollableParent from '~/utilities/getScrollableParent';

import TextField from './TextField.vue';
import Fade from './Fade.vue';

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
    required?: boolean;
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
    required: false,
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
  <div class="select" :class="[disabled ? 'opacity-60' : '']">
    <label v-if="label" class="select-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div ref="target" class="relative">
      <div
        ref="select"
        class="select-input"
        :class="{
          placeholder: !flux.selected,
          focus: flux.show,
          danger: isInvalid || errorMessage,
          disabled: disabled,
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

      <Fade>
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
                'select-menu-item-active': value === item.value,
              }"
              @click="flux.onSelect(item.value, item)"
            >
              {{ flux.display(item) }}
            </div>
          </div>

          <div v-if="reoptions.length === 0" class="p-2">
            {{ notFoundContent }}
          </div>
        </div>
      </Fade>
    </div>

    <div v-if="errorMessage" class="text-red-500 text-xs">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select {
  @apply flex flex-col w-full;

  $border: 1px;
  $height: 40px;

  &-input {
    &:hover .select-input-icon-clear {
      @apply visible;
    }

    &-icon {
      @apply absolute right-3 top-1/2 -translate-y-1/2;
    }

    &-icon-clear {
      @apply bg-white dark:bg-slate-800 hover:text-slate-500;
      @apply z-100 invisible;
    }
  }

  &-section {
    @apply fixed w-full z-10;

    transform: translateY(0) translateY(8px) translateY(0);

    &-up {
      transform: translateY(-$border) translateY(-$height) translateY(-100%);
    }
  }

  &-filter {
    @apply px-2 pt-2;
  }

  &-menu {
    @apply cursor-pointer max-h-40 overflow-auto p-2 empty:hidden;

    &-item {
      @apply px-3 py-1 cursor-pointer rounded-md;
      @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600;
    }
  }
}

.select-label {
  @apply text-sm font-bold mb-2 empty:hidden;
}

.select-input {
  @apply relative;
  @apply cursor-pointer border border-slate-400 rounded w-full py-2 pl-3 pr-9;
  @apply bg-white dark:bg-slate-800 leading-tight;

  &.placeholder {
    @apply text-gray-400 truncate;
  }

  &.focus {
    @apply outline-0 ring-1 ring-primary-400 border-primary-400;
  }

  &.danger {
    @apply border-red-500 mb-1;
    @apply ring-red-500 border-red-500;
  }

  &.disabled {
    @apply cursor-not-allowed;
  }
}

.select-menu-item-active {
  @apply bg-primary-500 text-white hover:bg-primary-700 hover:text-white;
}
</style>
