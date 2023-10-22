<script lang="ts" setup>
import { ref, reactive, computed, watch, watchEffect, nextTick, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

import getScrollableParent from '~/utilities/getScrollableParent';

import Checkbox from './Checkbox.vue';
import Chip from './Chip.vue';
import TextField from './TextField.vue';
import ProgressBar from './ProgressBar.vue';
import Fade from './Fade.vue';

type Option = {
  checked?: boolean;
  label: string;
  value: string | number;
  [key: string]: unknown;
  options?: Options;
};

type Options = Option[];

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: Option['value'][];
    options?: Options;
    display?: 'label' | 'value' | ((opt: Option) => void);
    placeholder?: string;
    clearable?: boolean;
    filterable?: boolean;
    disabled?: boolean;
    required?: boolean;
    loading?: boolean;
    notFoundContent?: string;
    isInvalid?: boolean;
    errorMessage?: string;
    selectedLabels?: boolean;
  }>(),
  {
    label: '',
    value: () => [],
    options: () => [],
    display: 'label',
    placeholder: 'Please select',
    notFoundContent: 'No results found',
    errorMessage: '',
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val?: Option['value'][] | null): void;
  (evt: 'change', val?: Option['value'] | null, opt?: Option | null): void;
}>();

const flux = reactive({
  show: false,
  direction: 'down' as 'down' | 'up',
  selected: [] as Option[],
  displaySelected(selected: Option[]) {
    return selected.map((item) => item.label);
  },
  filterValue: '',
  options: [] as Option[],
  onSelect(value: Option['value'], option: Option) {
    flux.options = [...initOptions.value].map((item) => {
      if (item.value === value) {
        return { ...item, checked: !option.checked };
      }

      return { ...item, checked: props.value?.includes(item.value) };
    });

    flux.filterValue = '';
    if (selectFilter.value) selectFilter.value.$el.querySelector('input').focus();

    flux.selected = flux.options.filter((item) => item.checked);

    emit(
      'update:value',
      flux.selected.map((item) => item.value),
    );
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
  clear(value: Option['value'] | null) {
    if (value) {
      emit(
        'update:value',
        flux.selected.filter((item) => item.value !== value).map((item) => item.value),
      );
      emit(
        'change',
        value,
        flux.selected.find((item) => item.value === value),
      );
    } else {
      emit('update:value', null);
      emit('change', null, null);
    }
  },
  selectAll: false,
  selectAllIndeterminate: false,
  onSelectAll() {
    flux.selectAll = !flux.selectAll;

    flux.options = [...initOptions.value].map((item) => {
      return { ...item, checked: flux.selectAll };
    });

    if (selectFilter.value) selectFilter.value.$el.querySelector('input').focus();

    flux.selected = flux.options.filter((item) => item.checked);

    emit(
      'update:value',
      flux.selected.map((item) => item.value),
    );
  },

  scrollableParent: null as HTMLElement | null,
});

const target = ref();
const selectInput = ref();
const selectPanel = ref();
const selectFilter = ref();
const selectList = ref();
const selectItem = ref<any[]>([]);

const initOptions = computed(() => props.options);

watchEffect(() => {
  if (props.value?.length) {
    const opts = props.options?.map((item) => ({
      ...item,
      checked: props.value.includes(item.value),
    }));

    flux.selected = opts.filter((item) => item.checked);
    flux.options = opts;

    const checked = opts.every((item) => item.checked);
    const unchecked = opts.every((item) => !item.checked);

    flux.selectAllIndeterminate = !(checked || unchecked);

    if (checked) flux.selectAll = true;
    if (unchecked) flux.selectAll = false;
  } else {
    const opts = props.options?.map((item) => ({ ...item, checked: false }));
    flux.selected = [];
    flux.options = opts;

    const checked = opts.every((item) => item.checked);
    const unchecked = opts.every((item) => !item.checked);

    flux.selectAllIndeterminate = !(checked || unchecked);

    if (checked) flux.selectAll = true;
    if (unchecked) flux.selectAll = false;
  }
});

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
    flux.scrollableParent = getScrollableParent(selectInput.value);

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

    const active = selectPanel.value.querySelector('.Multiselect-Item-Active');
    const offsetTop = active?.offsetTop;
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
    const arr = [...initOptions.value]?.map((item) => ({
      ...item,
      checked: props.value?.includes(item.value),
    }));

    const filter = arr.filter(
      (item) =>
        item.label.toUpperCase().includes(val.toUpperCase()) ||
        String(item.value).toUpperCase().includes(val.toUpperCase()),
    );

    flux.options = filter;
  },
);

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
  <div class="Multiselect-Wrapper" :class="{ disabled }">
    <div class="Multiselect-Label">
      <template v-if="label">{{ label }}</template>
      <slot v-else></slot>
      <span v-if="required" class="text-red-500">*</span>
    </div>

    <div ref="target">
      <div
        ref="selectInput"
        class="Multiselect-Input group"
        :class="[
          {
            placeholder: !flux.selected?.length,
            focus: flux.show,
            danger: isInvalid || errorMessage,
            disabled: disabled,
            'flex items-center': selectedLabels,
          },
          flux.selected?.length ? 'py-1.5' : 'py-2',
        ]"
        @click="open"
      >
        <div v-if="!flux.selected?.length" class="flex-1">
          {{ placeholder }}
        </div>

        <div v-if="flux.selected?.length && selectedLabels" class="flex-1">
          {{ flux.selected?.length }} Selected
        </div>

        <div v-else-if="flux.selected?.length" class="flex-1 flex flex-wrap gap-1">
          <Chip
            v-for="item in flux.selected"
            :key="item.value"
            :closable="clearable"
            :disabled="disabled"
            @close="flux.clear(item.value)"
          >
            {{ flux.display(item) }}
          </Chip>
        </div>

        <div
          v-if="flux.selected?.length && clearable && !disabled"
          class="i-fa-times-circle w-4 h-4 ml-2 invisible hover:text-slate-600 group-hover:visible"
          @click.stop="flux.clear(null)"
        ></div>

        <div v-if="!flux.show" class="Multiselect-Arrow i-fa-caret-down"></div>
        <div v-else class="Multiselect-Arrow i-fa-caret-up"></div>

        <ProgressBar v-if="loading" class="absolute left-0 bottom-0 rounded" />
      </div>

      <Fade>
        <div
          v-show="flux.show"
          ref="selectPanel"
          class="Multiselect-Panel"
          :class="{
            'Multiselect-Panel-PlacementBottom': flux.direction === 'down',
            'Multiselect-Panel-PlacementTop': flux.direction === 'up',
          }"
        >
          <div v-if="filterable" class="Multiselect-FilterWrapper">
            <TextField ref="selectFilter" v-model:value="flux.filterValue" />
          </div>

          <div
            v-if="flux.options?.length"
            class="cursor-pointer bg-slate-200 dark:bg-slate-600 rounded"
            :class="{ 'mt-2': filterable }"
            @click.stop="flux.onSelectAll"
          >
            <div class="flex items-center px-5">
              <Checkbox
                :checked="flux.selectAll"
                :indeterminate="flux.selectAllIndeterminate"
                @change.stop="flux.onSelectAll"
              />
              <span class="ml-2">All</span>
            </div>
          </div>

          <div ref="selectList" class="Multiselect-List">
            <div
              v-for="(item, index) in flux.options"
              :ref="(el) => (selectItem[index] = el)"
              :key="item.value"
              class="Multiselect-Item"
              :class="{ 'Multiselect-Item-Active': item.checked }"
              @click.stop="flux.onSelect(item.value, item)"
            >
              <Checkbox
                :checked="item.checked"
                class="align-self-start"
                @change.stop="flux.onSelect(item.value, item)"
              />
              <span class="ml-2">{{ flux.display(item) }}</span>
            </div>
          </div>

          <div v-if="flux.options.length === 0" class="p-4">
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
.Multiselect-Wrapper {
  @apply flex flex-col w-full;

  &.disabled {
    @apply opacity-60;
  }
}

.Multiselect-Label {
  @apply text-sm font-bold mb-2 empty:hidden;
}

.Multiselect-Input {
  @apply relative flex items-center w-full px-3 py-2 cursor-pointer;
  @apply border border-slate-400 bg-white dark:bg-slate-800 rounded leading-tight;

  &.placeholder {
    @apply text-gray-400 truncate;
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

.Multiselect-Arrow {
  @apply w-4 h-4 ml-2;
}

.Multiselect-Panel {
  @apply fixed w-full z-10 bg-white dark:bg-slate-800 shadow-lg rounded;
}

.Multiselect-Panel-PlacementBottom {
  transform: translateY(0.5rem);
}

.Multiselect-Panel-PlacementTop {
  transform: translateY(-0.5rem) translateY(-100%);
}

.Multiselect-FilterWrapper {
  @apply px-2 pt-2;
}

.Multiselect-List {
  @apply cursor-pointer max-h-40 overflow-auto p-2 empty:hidden;
}

.Multiselect-Item {
  @apply flex items-center px-3 cursor-pointer rounded-md whitespace-nowrap;
  @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600;
}
</style>
