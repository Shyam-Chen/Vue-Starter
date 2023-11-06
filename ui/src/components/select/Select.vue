<script lang="ts" setup>
import { ref, reactive, computed, watch, watchEffect, nextTick, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useLocale } from 'vue-localer';

import scrollableParent from '../../utilities/scrollable-parent/scrollableParent';

import ProgressBar from '../progress-bar/ProgressBar.vue';
import Fade from '../fade/Fade.vue';
import TextField from '../text-field/TextField.vue';

type Option = {
  label: string;
  value: string | number;
};

// type OptionGroup = {
//   label: string;
//   values: Option[];
// };

type Options = Option[];

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: Option['value'] | null;
    options?: Options;
    display?: 'label' | 'value' | ((opt: Option) => string);
    placeholder?: string;
    clearable?: boolean;
    filterable?: boolean;
    disabled?: boolean;
    required?: boolean;
    loading?: boolean;
    notFoundContent?: string;
    isInvalid?: boolean;
    errorMessage?: string;
  }>(),
  {
    label: '',
    value: undefined,
    options: () => [],
    display: 'label',
    placeholder: '',
    clearable: false,
    filterable: false,
    disabled: false,
    required: false,
    notFoundContent: '',
    isInvalid: false,
    errorMessage: '',
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val?: string | number | null): void;
  (evt: 'change', val: string | number | null, opt: Option | null): void;
}>();

const selectValue = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
});

const locale = useLocale();

const flux = reactive({
  show: false,
  direction: 'down' as 'down' | 'up',
  selected: undefined as Option | undefined,
  filterValue: '',
  options: [] as Options,
  onSelect(value: Option['value'], option: Option) {
    flux.show = false;
    selectValue.value = value;
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
    selectValue.value = null;
    emit('change', null, null);
  },

  scrollableParent: null as HTMLElement | null,
});

const target = ref();
const selectInput = ref();
const selectPanel = ref();
const selectFilter = ref();
const selectList = ref();
const selectItem = ref<any[]>([]);

const initialOptions = computed(() => props.options);

watch(
  () => props.options,
  (val) => {
    if (val?.length) {
      flux.options = val;
    }
  },
  { deep: true, immediate: true },
);

function resizePanel() {
  const rect = selectInput.value.getBoundingClientRect();

  selectPanel.value.style.width = `${rect.width}px`;
  selectPanel.value.style.left = `${rect.left}px`;

  const center = window.innerHeight / 2;

  if (rect.top > center) {
    selectPanel.value.style.top = `${rect.top}px`;
    flux.direction = 'up';
  } else {
    selectPanel.value.style.top = `${rect.bottom}px`;
    flux.direction = 'down';
  }
}

const open = () => {
  if (props.disabled) return;

  flux.show = !flux.show;

  nextTick(() => {
    flux.scrollableParent = scrollableParent(selectInput.value);

    resizePanel();

    /**
     * Because of the use of `whitespace-nowrap` on `Select-Item`,
     * if there's a scrollbar, set that width for all options; otherwise, keep it at 100%.
     */
    if (selectList.value.scrollWidth > selectList.value.offsetWidth) {
      const width = `${selectList.value.scrollWidth}px`;

      for (let index = 0; index < selectItem.value.length; index++) {
        if (selectItem.value[index]) {
          selectItem.value[index].style.width = width;
        }
      }
    } else {
      for (let index = 0; index < selectItem.value.length; index++) {
        if (selectItem.value[index]) {
          selectItem.value[index].style.width = '100%';
        }
      }
    }

    const active = selectPanel.value.querySelector('.Select-Item-Active');
    const offsetTop = props.filterable ? active?.offsetTop - 46 : active?.offsetTop;
    if (offsetTop) selectList.value.scrollTop = offsetTop - active.offsetHeight * 2;

    if (selectFilter.value) selectFilter.value.$el.querySelector('input').focus();
  });
};

onClickOutside(target, () => {
  flux.show = false;
});

watch(
  () => flux.filterValue,
  (val) => {
    const arr = [...initialOptions.value];

    const filter = arr.filter(
      (item) =>
        item.label.toUpperCase().includes(val.toUpperCase()) ||
        String(item.value).toUpperCase().includes(val.toUpperCase()),
    );

    flux.options = filter;
  },
);

watchEffect(() => {
  if (selectValue.value && initialOptions.value?.length) {
    const arr = [...initialOptions.value];
    const found = arr.find((item) => item.value === selectValue.value);
    flux.selected = found;
  } else {
    flux.selected = undefined;
  }
});

const wrapper = computed(() => flux.scrollableParent);

const handleScroll = () => {
  if (flux.show) resizePanel();
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
  <div class="Select-Wrapper" :class="{ disabled }">
    <div class="Select-Label">
      <template v-if="label">{{ label }}</template>
      <slot v-else></slot>
      <span v-if="required" class="text-red-500">*</span>
    </div>

    <div ref="target">
      <div
        ref="selectInput"
        class="Select-Input group"
        :class="{
          placeholder: !flux.selected,
          focus: flux.show,
          danger: isInvalid || errorMessage,
          disabled: disabled,
        }"
        @click="open"
      >
        <div v-if="!flux.selected" class="flex-1">
          {{ placeholder || locale.pleaseSelect || 'Please select' }}
        </div>

        <div v-if="flux.selected" class="flex-1">
          {{ flux.display(flux.selected) }}
        </div>

        <div
          v-if="value && clearable && !disabled"
          class="i-fa-times-circle w-4 h-4 ml-2 invisible hover:text-slate-600 group-hover:visible"
          @click.stop="flux.clear"
        ></div>

        <div v-if="!flux.show" class="Select-Arrow i-fa-caret-down"></div>
        <div v-else class="Select-Arrow i-fa-caret-up"></div>

        <ProgressBar v-if="loading" class="absolute left-0 bottom-0 rounded" />
      </div>

      <Fade>
        <div
          v-show="flux.show"
          ref="selectPanel"
          class="Select-Panel"
          :class="{
            'Select-Panel-PlacementBottom': flux.direction === 'down',
            'Select-Panel-PlacementTop': flux.direction === 'up',
          }"
        >
          <div v-if="filterable" class="Select-FilterWrapper">
            <TextField ref="selectFilter" v-model:value="flux.filterValue" />
          </div>

          <div ref="selectList" class="Select-List">
            <div
              v-for="(item, index) in flux.options"
              :ref="(el) => (selectItem[index] = el)"
              :key="item.value"
              class="Select-Item"
              :class="{ 'Select-Item-Active': value === item.value }"
              @click="flux.onSelect(item.value, item)"
            >
              {{ flux.display(item) }}
            </div>
          </div>

          <div v-if="flux.options.length === 0" class="p-2">
            {{ notFoundContent || locale.notFoundContent || 'No results found' }}
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
.Select-Wrapper {
  @apply flex flex-col w-full;

  &.disabled {
    @apply opacity-60;
  }
}

.Select-Label {
  @apply text-sm font-bold mb-2 empty:hidden;
}

.Select-Input {
  @apply relative flex items-center w-full px-3 py-2 cursor-pointer;
  @apply border border-slate-400 bg-white dark:bg-slate-800 rounded leading-tight;

  &.placeholder {
    @apply text-slate-400 dark:text-slate-500 truncate;
  }

  &.focus {
    @apply outline-0 ring-1 ring-primary-400 border-primary-400;
  }

  &.danger {
    @apply border-red-500 mb-1 ring-red-500 border-red-500;
  }

  &.disabled {
    @apply cursor-not-allowed;
  }
}

.Select-Arrow {
  @apply w-4 h-4 ml-2;
}

.Select-Panel {
  @apply fixed w-full z-10 bg-white dark:bg-slate-800 shadow-lg rounded;
}

.Select-Panel-PlacementBottom {
  transform: translateY(0.5rem);
}

.Select-Panel-PlacementTop {
  transform: translateY(-0.5rem) translateY(-100%);
}

.Select-FilterWrapper {
  @apply px-2 pt-2;
}

.Select-List {
  @apply cursor-pointer max-h-40 overflow-auto p-2 empty:hidden;
}

.Select-Item {
  @apply px-3 py-1 cursor-pointer rounded-md whitespace-nowrap;
  @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600;
}

.Select-Item-Active {
  @apply bg-primary-500 text-white hover:bg-primary-700 hover:text-white;
}
</style>
