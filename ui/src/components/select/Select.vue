<script lang="ts" setup>
import { ref, reactive, computed, watch, watchEffect, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useLocale } from 'vue-localer';

import FormControl from '../form-control/FormControl.vue';
import ProgressBar from '../progress-bar/ProgressBar.vue';
import Fade from '../fade/Fade.vue';
import TextField from '../text-field/TextField.vue';
import useScrollParent from '../../composables/scroll-parent/useScrollParent';

type Option = {
  label: string;
  value: string | number;
};

// type OptionGroup = {
//   label: string;
//   values: Option[];
// };

const valueModel = defineModel<Option['value']>('value');

const props = withDefaults(
  defineProps<{
    label?: string;
    options?: Option[];
    display?: 'label' | 'value' | ((opt: Option) => string);
    placeholder?: string;
    clearable?: boolean;
    filterable?: boolean;
    disabled?: boolean;
    required?: boolean;
    loading?: boolean;
    notFoundContent?: string;
    invalid?: boolean | string;
    help?: string;
  }>(),
  {
    label: '',
    options: () => [],
    display: 'label',
    placeholder: '',
    clearable: false,
    filterable: false,
    disabled: false,
    required: false,
    loading: false,
    notFoundContent: '',
    invalid: undefined,
    help: '',
  },
);

const emit = defineEmits<{
  (evt: 'change', val?: Option['value'], opt?: Option): void;
  (evt: 'blur'): void;
}>();

const locale = useLocale();

const flux = reactive({
  show: false,
  direction: 'down' as 'down' | 'up',
  selected: undefined as Option | undefined,
  filterValue: '',
  options: [] as Option[],
  onSelect(value: Option['value'], option: Option) {
    flux.show = false;
    valueModel.value = value;
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
    valueModel.value = undefined;
    emit('change', undefined, undefined);
  },
});

const target = ref();
const selectInput = ref();
const selectPanel = ref();
const selectFilter = ref();
const selectList = ref();
const selectItem = ref<HTMLDivElement[]>([]);

const focused = ref(false);

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
  focused.value = true;
  hoverIndex.value = -1;

  nextTick(() => {
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

    if (valueModel.value) {
      hoverIndex.value = flux.options?.findIndex((opt) => opt.value === valueModel.value);
    }

    if (selectFilter.value) selectFilter.value.$el.querySelector('input').focus();
  });
};

onClickOutside(target, () => {
  flux.show = false;
  focused.value = false;
  hoverIndex.value = -1;
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
  if (valueModel.value && initialOptions.value?.length) {
    const arr = [...initialOptions.value];
    const found = arr.find((item) => item.value === valueModel.value);
    flux.selected = found;
  } else {
    flux.selected = undefined;
  }
});

useScrollParent(
  computed(() => selectPanel.value),
  () => {
    if (flux.show) resizePanel();
  },
);

const hoverIndex = ref(-1);

function onKeydown(evt: KeyboardEvent) {
  if (['Space', 'Enter'].includes(evt.code)) {
    evt.preventDefault();

    if (flux.show && hoverIndex.value !== -1) {
      flux.onSelect(flux.options?.[hoverIndex.value]?.value, flux.options?.[hoverIndex.value]);
    } else {
      open();
    }
  }

  if (evt.code === 'Escape') {
    flux.show = false;
  }

  if (evt.code === 'ArrowDown') {
    evt.preventDefault();
    if (!flux.show && !flux.options?.length) return;
    if (hoverIndex.value === Number(flux.options?.length) - 1) return;
    hoverIndex.value += 1;

    const hover = selectList.value.querySelector('.Select-Item-Hover');
    const offsetTop = hover?.offsetTop;
    if (offsetTop) selectList.value.scrollTop = offsetTop - hover.offsetHeight;
  }

  if (evt.code === 'ArrowUp') {
    evt.preventDefault();
    if (!flux.show && !flux.options?.length) return;
    if (hoverIndex.value <= 0) return;
    hoverIndex.value -= 1;

    const hover = selectList.value.querySelector('.Select-Item-Hover');
    const offsetTop = hover?.offsetTop;
    if (offsetTop) selectList.value.scrollTop = offsetTop - hover.offsetHeight;
  }

  if (evt.code === 'Tab') {
    selectInput.value.blur();
    flux.show = false;
    focused.value = false;
  }
}

watch(
  () => focused.value,
  (val) => {
    if (!val) emit('blur');
  },
);
</script>

<template>
  <FormControl :label="label" :required="required" :invalid="invalid" :help="help">
    <div ref="target" class="w-full">
      <div
        ref="selectInput"
        v-bind="$attrs"
        :tabindex="disabled ? -1 : 0"
        class="Select-Input group"
        :class="{
          placeholder: !flux.selected,
          focused,
          invalid,
          disabled,
        }"
        @focus="focused = true"
        @click="open"
        @keydown="onKeydown"
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

        <div class="Select-ArrowWrapper">
          <div
            v-if="!flux.show"
            class="Select-Arrow i-material-symbols-arrow-drop-down-rounded"
          ></div>
          <div v-else class="Select-Arrow i-material-symbols-arrow-drop-up-rounded"></div>
        </div>

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
            <TextField
              ref="selectFilter"
              v-model:value="flux.filterValue"
              append="i-material-symbols-filter-alt-outline"
            />
          </div>

          <div ref="selectList" class="Select-List">
            <div
              v-for="(item, index) in flux.options"
              :ref="(el) => (selectItem[index] = el as HTMLDivElement)"
              :key="item.value"
              class="Select-Item"
              :class="{
                'Select-Item-Hover': index === hoverIndex,
                'Select-Item-Active': value === item.value,
              }"
              @click="flux.onSelect(item.value, item)"
              @mouseenter="hoverIndex = index"
              @mouseleave="hoverIndex = -1"
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
  </FormControl>
</template>

<style lang="scss" scoped>
.Select-Input {
  @apply relative flex items-center w-full px-3 py-2 cursor-pointer;
  @apply border border-slate-400 bg-white dark:bg-slate-800 rounded leading-tight;
  @apply focus:border-primary-400 focus:outline-0 focus:ring-2 focus:ring-primary-500/50;

  &.placeholder {
    @apply text-slate-400 dark:text-slate-500 truncate;
  }

  &.focused {
    @apply border-primary-400 outline-0 ring-2 ring-primary-500/50;
  }

  &.invalid {
    @apply border-red-500 ring-red-500/50;
    @apply focus:border-red-400 focus:ring-red-500/50;
  }

  &.disabled {
    @apply cursor-not-allowed opacity-60 focus:ring-0 focus:border-slate-400;
  }
}

.Select-ArrowWrapper {
  @apply w-5 h-5 overflow-hidden flex justify-center items-center;
}

.Select-Arrow {
  @apply min-w-6 min-h-6 ml-2;
}

.Select-Panel {
  @apply fixed w-full z-101 border shadow-lg rounded;
  @apply bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700;
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
}

.Select-Item-Hover {
  @apply text-primary-500 dark:text-primary-100 bg-primary-100 dark:bg-primary-600;
}

.Select-Item-Active {
  @apply bg-primary-500 text-white hover:bg-primary-700 hover:text-white;
}
</style>
