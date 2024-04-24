<script lang="ts" setup>
import { nextTick, ref, reactive, computed, watch, watchEffect } from 'vue';
import { useLocaler, useLocale } from 'vue-localer';
import { onClickOutside } from '@vueuse/core';

import FormControl from '../form-control/FormControl.vue';
import Checkbox from '../checkbox/Checkbox.vue';
import Chip from '../chip/Chip.vue';
import TextField from '../text-field/TextField.vue';
import ProgressBar from '../progress-bar/ProgressBar.vue';
import Fade from '../fade/Fade.vue';
import useScrollParent from '../../composables/scroll-parent/useScrollParent';

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
    invalid?: boolean | string;
    help?: string;
    selectedLabels?: boolean;
  }>(),
  {
    label: '',
    value: () => [],
    options: () => [],
    display: 'label',
    placeholder: '',
    notFoundContent: '',
    invalid: undefined,
    help: '',
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val?: Option['value'][] | null): void;
  (evt: 'change', val?: Option['value'] | null, opt?: Option | null): void;
}>();

const localer = useLocaler();
const locale = useLocale();

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

const selectedStatus = ref(false);

const open = () => {
  if (props.disabled) return;

  flux.show = !flux.show;

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

    const active = selectPanel.value.querySelector('.Multiselect-Item-Active');
    const offsetTop = props.filterable ? active?.offsetTop - 54 : active?.offsetTop;
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

useScrollParent(
  computed(() => selectPanel.value),
  () => {
    if (flux.show) resizePanel();
  },
);
</script>

<template>
  <FormControl :label :required :invalid :help>
    <template #label>
      <slot></slot>
      <span v-if="label" class="flex-1"></span>
      <span
        v-if="selectedLabels && flux.selected?.length"
        class="Multiselect-LabelHelper"
        @click="selectedStatus = !selectedStatus"
      >
        <template v-if="!selectedStatus">
          <span>{{ locale.show || 'Show' }}</span>
          <div class="i-material-symbols-add-rounded w-4 h-4"></div>
        </template>

        <template v-else>
          <span>{{ locale.hide || 'Hide' }}</span>
          <div class="i-material-symbols-check-indeterminate-small-rounded w-4 h-4"></div>
        </template>
      </span>
    </template>

    <template #default>
      <div ref="target" class="w-full">
        <div
          v-bind="$attrs"
          ref="selectInput"
          :tabindex="disabled ? -1 : 0"
          class="Multiselect-Input group"
          :class="[
            {
              placeholder: !flux.selected?.length,
              focus: flux.show,
              invalid,
              disabled,
              'flex items-center': selectedLabels,
            },
            flux.selected?.length ? (selectedLabels && !selectedStatus ? 'py-2' : 'py-1') : 'py-2',
          ]"
          @click="open"
        >
          <div v-if="!flux.selected?.length" class="flex-1">
            {{ placeholder || locale.pleaseSelect || 'Please select' }}
          </div>

          <div v-if="flux.selected?.length && selectedLabels && !selectedStatus" class="flex-1">
            {{
              flux.selected.length === 1
                ? localer.f(locale.oneItemSelected, { num: flux.selected.length }) ||
                  `1 item selected`
                : localer.f(locale.numItemsSelected, { num: flux.selected.length }) ||
                  `${flux.selected.length} items selected`
            }}
          </div>

          <div v-else-if="flux.selected?.length" class="flex-1 flex flex-wrap gap-1">
            <Chip
              v-for="item in flux.selected"
              :key="item.value"
              :closable="clearable || selectedStatus"
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

          <div class="Multiselect-ArrowWrapper">
            <div
              v-if="!flux.show"
              class="Multiselect-Arrow i-material-symbols-arrow-drop-down-rounded"
            ></div>
            <div v-else class="Multiselect-Arrow i-material-symbols-arrow-drop-up-rounded"></div>
          </div>

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
              <TextField
                ref="selectFilter"
                v-model:value="flux.filterValue"
                append="i-material-symbols-filter-alt-outline"
              />
            </div>

            <div
              v-if="flux.options?.length"
              class="cursor-pointer bg-slate-200 dark:bg-slate-600 rounded"
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
              {{ notFoundContent || locale.notFoundContent || 'No results found' }}
            </div>
          </div>
        </Fade>
      </div>
    </template>
  </FormControl>
</template>

<style lang="scss" scoped>
.Multiselect-LabelHelper {
  @apply flex text-xs font-normal text-info-500 cursor-pointer;
}

.Multiselect-Input {
  @apply relative flex items-center w-full px-3 cursor-pointer;
  @apply border border-slate-400 bg-white dark:bg-slate-800 rounded leading-tight;
  @apply focus:border-primary-400 focus:outline-0 focus:ring-2 focus:ring-primary-500/50;

  &.placeholder {
    @apply text-slate-400 dark:text-slate-500 truncate;
  }

  &.focus {
    @apply outline-0 ring-2 ring-primary-500/50 border-primary-400;
  }

  &.invalid {
    @apply !border-red-500 !dark:border-red-500;
    @apply !ring-red-500/50 !border-red-500;
  }

  &.disabled {
    @apply cursor-not-allowed opacity-60 focus:ring-0 focus:border-slate-400;
  }
}

.Multiselect-ArrowWrapper {
  @apply w-5 h-5 overflow-hidden flex justify-center items-center;
}

.Multiselect-Arrow {
  @apply min-w-6 min-h-6 ml-2;
}

.Multiselect-Panel {
  @apply fixed w-full z-101 border shadow-lg rounded;
  @apply bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700;
}

.Multiselect-Panel-PlacementBottom {
  transform: translateY(0.5rem);
}

.Multiselect-Panel-PlacementTop {
  transform: translateY(-0.5rem) translateY(-100%);
}

.Multiselect-FilterWrapper {
  @apply p-2;
}

.Multiselect-List {
  @apply cursor-pointer max-h-40 overflow-auto p-2 empty:hidden;
}

.Multiselect-Item {
  @apply flex items-center px-3 cursor-pointer rounded-md whitespace-nowrap;
  @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600;
}
</style>
