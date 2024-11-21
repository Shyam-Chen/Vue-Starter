<script lang="ts" setup>
import { nextTick, ref, computed, watchEffect, watch, inject, useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useLocale } from 'vue-localer';

import type { FormControlProps } from '../form-control';
import FormControl, { formControlDefaults, useFormControlAttrs } from '../form-control';
import Popover from '../popover/Popover.vue';
import TextField from '../text-field/TextField.vue';

type Option = {
  label: string;
  value?: any;
  items?: Option[];
};

defineOptions({ inheritAttrs: false });

const valueModel = defineModel<Option['value']>('value');

const props = withDefaults(
  defineProps<
    {
      options?: Option[];
      placeholder?: string;
      filterable?: boolean;
      disabled?: boolean;
      loading?: boolean;
    } & FormControlProps
  >(),
  {
    options: () => [],
    placeholder: '',
    filterable: false,
    disabled: false,
    loading: false,
    ...formControlDefaults,
  },
);

const emit = defineEmits<{
  <T extends Option>(evt: 'change', val?: T['value'], opt?: T): void;
}>();

const locale = useLocale();

const formControlAttrs = useFormControlAttrs(props);

const show = ref(false);
const initialOptions = computed(() => props.options);
const renderOptions = ref<Option[]>([]);
const selected = ref<Option | null | undefined>(null);
const input = useTemplateRef('input');
const panel = useTemplateRef('panel');
const filter = useTemplateRef('filter');
const list = useTemplateRef('list');
const items = ref<HTMLDivElement[]>([]);

async function showPicker() {
  if (props.disabled) return;

  show.value = !show.value;
  hoverIndex.value = -1;

  await nextTick();

  // Due to the use of `whitespace-nowrap` on `.Select-Item`,
  // if a scrollbar is present, set the width for all options to accommodate it;
  // otherwise, keep the width at 100%.
  if (list.value) {
    if (list.value.scrollWidth > list.value.offsetWidth) {
      const width = `${list.value.scrollWidth}px`;

      for (let index = 0; index < items.value.length; index++) {
        if (items.value[index]) {
          items.value[index].style.width = width;
        }
      }
    } else {
      for (let index = 0; index < items.value.length; index++) {
        if (items.value[index]) {
          items.value[index].style.width = '100%';
        }
      }
    }
  }

  // Scroll to the selected option
  const active = panel.value?.querySelector('.Select-Item.active') as HTMLDivElement;
  const offsetTop = props.filterable ? active?.offsetTop - 46 : active?.offsetTop;
  if (offsetTop && list.value) list.value.scrollTop = offsetTop - active.offsetHeight * 2;

  // -
  if (valueModel.value) {
    hoverIndex.value = renderOptions.value?.findIndex((opt) => opt.value === valueModel.value);
  }

  // -
  if (filter.value) filter.value.$el.querySelector('input').focus();
}

watchEffect(() => {
  if (panel.value) {
    panel.value.style.width = `${input.value?.$el.getBoundingClientRect().width}px`;
  }
});

function onSelect(value: Option['value'], option: Option) {
  show.value = false;
  valueModel.value = value;
  emit('change', value, option);
}

function onClear() {
  valueModel.value = undefined;
  emit('change', undefined, undefined);
}

watch(
  () => props.options,
  (val) => {
    renderOptions.value = val || [];
  },
  { deep: true, immediate: true },
);

watchEffect(() => {
  if (valueModel.value && initialOptions.value?.length) {
    const options = [...initialOptions.value];
    const found = options.find((item) => item.value === valueModel.value);
    selected.value = found;
  } else {
    selected.value = undefined;
  }
});

// -

const filterValue = ref('');

watch(filterValue, (val) => {
  const options = [...initialOptions.value];

  const filtered = options.filter(
    (item) =>
      item.label.toUpperCase().includes(val.toUpperCase()) ||
      String(item.value).toUpperCase().includes(val.toUpperCase()),
  );

  renderOptions.value = filtered;
});

// -

const hoverIndex = ref(-1);

function onKeydown(evt: KeyboardEvent) {
  if (['Space', 'Enter'].includes(evt.code)) {
    evt.preventDefault();

    if (show.value && hoverIndex.value !== -1) {
      onSelect(
        renderOptions.value?.[hoverIndex.value]?.value,
        renderOptions.value?.[hoverIndex.value],
      );
    } else {
      showPicker();
    }
  }

  if (evt.code === 'Escape') {
    show.value = false;
  }

  if (evt.code === 'ArrowDown') {
    evt.preventDefault();
    if (!show.value && !renderOptions.value?.length) return;
    if (hoverIndex.value === Number(renderOptions.value?.length) - 1) return;
    hoverIndex.value += 1;

    if (list.value) {
      const hover = list.value.querySelector('.Select-Item.hover') as HTMLDivElement;
      const offsetTop = hover?.offsetTop;
      if (offsetTop) list.value.scrollTop = offsetTop - hover.offsetHeight;
    }
  }

  if (evt.code === 'ArrowUp') {
    evt.preventDefault();
    if (!show.value && !renderOptions.value?.length) return;
    if (hoverIndex.value <= 0) return;
    hoverIndex.value -= 1;

    if (list.value) {
      const hover = list.value.querySelector('.Select-Item.hover') as HTMLDivElement;
      const offsetTop = hover?.offsetTop;
      if (offsetTop) list.value.scrollTop = offsetTop - hover.offsetHeight;
    }
  }

  if (evt.code === 'Tab') {
    show.value = false;
  }
}

// -

const popover = inject('Popover', { withinPopover: false });

if (popover.withinPopover) {
  onClickOutside(panel, () => {
    show.value = false;
    hoverIndex.value = -1;
  });
}
</script>

<template>
  <FormControl v-bind="formControlAttrs" class="Select">
    <template #label>
      <slot></slot>
    </template>

    <template #default="{ id }">
      <Popover v-model="show" start class="w-full">
        <TextField
          :id
          ref="input"
          v-bind="$attrs"
          label=""
          :required="false"
          :invalid="!!invalid"
          help=""
          :value="selected?.label"
          :placeholder="
            loading ? 'Loading...' : placeholder || locale.pleaseSelect || 'Please select...'
          "
          :disabled="disabled || loading"
          :append="
            loading
              ? 'i-line-md-loading-twotone-loop'
              : show
                ? 'i-material-symbols-arrow-drop-up-rounded'
                : 'i-material-symbols-arrow-drop-down-rounded'
          "
          readonly
          class="Select-Input"
          :class="{ loading }"
          @clear="onClear"
          @click="showPicker"
          @append="showPicker"
          @keydown="onKeydown"
        />

        <template #content>
          <div
            v-if="show"
            ref="panel"
            class="shadow-lg rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
          >
            <div v-if="filterable" class="px-2 pt-2">
              <TextField
                ref="filter"
                v-model:value="filterValue"
                append="i-material-symbols-filter-alt-outline"
              />
            </div>

            <div ref="list" class="Select-List">
              <div
                v-for="(item, index) in renderOptions"
                :ref="(el: any) => (items[index] = el)"
                :key="item.value"
                class="Select-Item"
                :class="{
                  hover: index === hoverIndex,
                  active: value === item.value,
                }"
                @click="onSelect(item.value, item)"
                @mouseenter="hoverIndex = index"
                @mouseleave="hoverIndex = -1"
              >
                {{ item.label }}
              </div>
            </div>

            <div v-if="renderOptions.length === 0" class="p-2">
              {{
                initialOptions.length === 0
                  ? locale.noAvailableOptions || 'No available options'
                  : locale.noResultsFound || 'No results found'
              }}
            </div>
          </div>
        </template>
      </Popover>
    </template>
  </FormControl>
</template>

<style lang="scss" scoped>
.Select :deep(.Select-Input:not(.disabled)) {
  @apply cursor-pointer;
}

.Select :deep(.Select-Input:not(.disabled) + .TextField-Append) {
  @apply cursor-pointer;
}

.Select :deep(.Select-Input) {
  @apply text-ellipsis;

  &.loading {
    @apply opacity-100 cursor-progress;
  }
}

.Select :deep(.Select-Input.loading + .TextField-Append) {
  @apply opacity-100 cursor-progress;
}

.Select-List {
  @apply max-h-40 overflow-auto p-2 empty:hidden;
}

.Select-Item {
  @apply px-3 py-1 cursor-pointer rounded-md whitespace-nowrap;

  &.hover {
    @apply text-primary-500 dark:text-primary-100 bg-primary-100 dark:bg-primary-600;
  }

  &.active {
    @apply bg-primary-500 text-white hover:bg-primary-700 hover:text-white;
  }
}
</style>
