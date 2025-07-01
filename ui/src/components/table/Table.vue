<script lang="ts" setup generic="T">
import type { Ref, VNode } from 'vue';
import { ref, computed, watchEffect, watch } from 'vue';
import { useLocaler, useLocale } from 'vue-localer';
import { useScroll } from '@vueuse/core';

import type staticTable from '../../utilities/static-table/staticTable';
import Button from '../button/Button.vue';
import Checkbox from '../checkbox/Checkbox.vue';
import Select from '../select/Select.vue';
import Spinner from '../spinner/Spinner.vue';

import type { ColumnItem, Control } from './types';
import { controlDefaults } from './config';
import Column from './Column.vue';
import Row from './Row.vue';
import Cell from './Cell.vue';

type U = T & { _id?: string; id?: number; checked?: boolean; details?: unknown[] };

const valueModel = defineModel<U[]>('value', { default: [] });

const controlModel = defineModel<Control>('control', {
  get(val) {
    return {
      rows: val?.rows || controlDefaults.rows,
      page: val?.page || controlDefaults.page,
      field: val?.field || controlDefaults.field,
      direction: val?.direction || controlDefaults.direction,
    };
  },
  default: controlDefaults,
});

const selectedModel = defineModel<T[]>('selected', { default: [] });

const props = withDefaults(
  defineProps<{
    stickyHeader?: boolean;
    stickyFooter?: boolean;
    selectable?: boolean;
    columns?: ColumnItem[];
    static?: typeof staticTable;
    loading?: boolean;
    rows?: U[];
    count?: number;
  }>(),
  {
    stickyHeader: false,
    stickyFooter: false,
    selectable: false,
    columns: () => [],
    static: undefined,
    loading: false,
    rows: () => [],
    count: undefined,
  },
);

const emit = defineEmits<{
  (evt: 'change', val: Control): void;
  (evt: 'rowClick', val: U): void;
}>();

defineSlots<{
  thead(props: NonNullable<unknown>): VNode;
  tbody(props: NonNullable<unknown>): VNode;
  [colKey: string]: (props: { row: U; subrow?: any }) => VNode;
  collapsible(props: { row: U }): VNode;
  spanable(props: NonNullable<unknown>): VNode;
}>();

// -

const localer = useLocaler();
const locale = useLocale();

// -

const rowsPerPage = ref(controlDefaults.rows);
const currentPage = ref(controlDefaults.page);
const sortField = ref(controlDefaults.field);
const sortDirection = ref(controlDefaults.direction);

const paginationInfo = computed(() => {
  const start = props.rows?.length
    ? currentPage.value * rowsPerPage.value - rowsPerPage.value + 1
    : 0;

  const end =
    currentPage.value * rowsPerPage.value > Number(props.count)
      ? props.count
      : currentPage.value * rowsPerPage.value;

  if (locale.value.paginationInfo) {
    return localer.f(locale.value.paginationInfo, [start, end, props.count]);
  }

  return `${start}-${end} of ${props.count}`;
});

function onChange() {
  const control = {
    rows: rowsPerPage.value,
    page: currentPage.value,
    field: sortField.value,
    direction: sortDirection.value,
  };

  controlModel.value = control;
  emit('change', control);
}

function onPreviousPage() {
  currentPage.value -= 1;
  onChange();
}

function onNextPage() {
  currentPage.value += 1;
  onChange();
}

function onColumnSort(col: ColumnItem) {
  if (props.loading) return;
  sortField.value = col.key;
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  onChange();
}

function onRowsPerPageChange() {
  currentPage.value = 1;
  onChange();
}

watch(
  controlModel,
  (val) => {
    if (Object.keys(val)?.length) {
      rowsPerPage.value = val.rows || controlDefaults.rows;
      currentPage.value = val.page || controlDefaults.page;
      sortField.value = val.field || controlDefaults.field;
      sortDirection.value = val.direction || controlDefaults.direction;

      if (props.static && props.rows?.length) {
        _rows.value = props.static(props.rows, controlModel.value);
      }
    }
  },
  { immediate: true },
);

// -

function onRowClick(row: U) {
  emit('rowClick', row);
}

// -

const _rows = ref([]) as Ref<U[]>;

const selectAll = ref(false);
const indeterminate = ref(false);

watch(selectAll, (val) => {
  if (props.static) {
    const arr = props.rows?.map((item) => ({ ...item, checked: val }));
    _rows.value = props.static(arr, controlModel.value);

    arr.forEach((row) => {
      const found = valueModel.value.find((item) =>
        item._id ? item._id === row._id : item.id === row.id,
      );

      if (found) found.checked = val;
    });
  } else {
    _rows.value = props.rows?.map((item) => ({ ...item, checked: val }));
  }
});

watch(
  () => props.rows,
  (val) => {
    if (props.static && val?.length) {
      _rows.value = props.static(props.rows, controlModel.value);

      const checked = props.rows.every((item) => item.checked);
      const unchecked = props.rows.every((item) => !item.checked);
      indeterminate.value = !(checked || unchecked);
      if (checked) selectAll.value = true;
      if (unchecked) selectAll.value = false;
    } else {
      _rows.value = val;
    }
  },
  { deep: true, immediate: true },
);

watch(
  _rows,
  (val) => {
    if (props.static && val?.length) {
      val.forEach((row) => {
        const found = valueModel.value.find((item) =>
          item._id ? item._id === row._id : item.id === row.id,
        );

        if (found) found.checked = row.checked;
      });
    } else {
      const checked = val.every((item) => item.checked);
      const unchecked = val.every((item) => !item.checked);
      indeterminate.value = !(checked || unchecked);
      if (checked) selectAll.value = true;
      if (unchecked) selectAll.value = false;

      selectedModel.value = val.filter((item) => item.checked);
    }
  },
  { deep: true },
);

// -

const hasScrollbar = ref(false);
const tableWrapper = ref<HTMLDivElement>();
const { arrivedState, measure } = useScroll(tableWrapper);

watchEffect(
  () => {
    if (tableWrapper.value && !props.loading) {
      hasScrollbar.value = tableWrapper.value.scrollWidth > tableWrapper.value.clientWidth;
      measure();
    }
  },
  { flush: 'post' },
);
</script>

<template>
  <div class="relative">
    <div ref="tableWrapper" class="Table-Wrapper" :class="{ 'max-h-100': stickyHeader }">
      <table class="Table-Element">
        <thead>
          <slot name="thead"></slot>

          <tr :class="{ 'sticky top-0 z-10': stickyHeader }">
            <Column v-if="selectable" :class="{ '!border-0': stickyHeader }">
              <div class="flex items-center">
                <Checkbox v-model:value="selectAll" :indeterminate />
              </div>
            </Column>

            <Column
              v-for="col in columns"
              :key="col.key"
              :class="[
                {
                  '!border-0': stickyHeader,
                  'sticky left-0 z-5': col.sticky === 'left',
                  'sticky right-0 z-5': col.sticky === 'right',
                },
                col.class,
                col.classColumn,
              ]"
            >
              <div
                class="gap-1"
                :class="{
                  'cursor-pointer': typeof col.sortable === 'boolean' ? col.sortable : true,
                  'border-r-2 border-transparent':
                    hasScrollbar && !arrivedState.left && col.sticky === 'left',
                  'border-l-2 border-transparent':
                    hasScrollbar && !arrivedState.right && col.sticky === 'right',
                }"
                @click="onColumnSort(col)"
              >
                <div>{{ col.name }}</div>

                <template v-if="typeof col.sortable === 'boolean' ? col.sortable : true">
                  <div
                    v-if="sortField === col.key && sortDirection === 'desc'"
                    class="i-tabler-sort-descending size-5"
                  ></div>

                  <div
                    v-else-if="sortField === col.key && sortDirection === 'asc'"
                    class="i-tabler-sort-ascending size-5"
                  ></div>

                  <div v-else class="i-tabler-arrows-sort size-5"></div>
                </template>
              </div>
            </Column>
          </tr>
        </thead>

        <tbody v-if="loading">
          <Row>
            <Cell :colspan="selectable ? Number(columns?.length) + 1 : columns?.length">
              <div class="w-full !min-h-379.5px flex flex-col justify-center items-center">
                <Spinner class="w-10 h-10" />
              </div>
            </Cell>
          </Row>
        </tbody>

        <slot v-else name="tbody">
          <tbody v-if="_rows?.length">
            <template v-for="(row, index) in _rows" :key="row._id || row.id || index">
              <Row
                class="sticky-tr"
                :class="{ selected: selectable && row.checked }"
                @click="onRowClick(row)"
              >
                <Cell v-if="selectable">
                  <div class="flex items-center">
                    <Checkbox v-model:value="row.checked" />
                  </div>
                </Cell>

                <Cell
                  v-for="col in columns"
                  :key="col.key"
                  :class="[
                    {
                      'sticky-col sticky z-5 bg-white dark:bg-slate-800 !p-0': col.sticky,
                      selected: col.sticky && selectable && row.checked,
                      'left-0': col.sticky === 'left',
                      'right-0': col.sticky === 'right',
                    },
                    col.class,
                    col.classCell,
                  ]"
                >
                  <div
                    v-if="col.spanable"
                    class="flex-col justify-center gap-1"
                    :class="{ 'py-2': Number(row.details?.length) > 1 }"
                  >
                    <div v-for="(subrow, subindex) in row.details" :key="subindex" class="flex-1">
                      <slot :name="col.key" :row :subrow>{{
                        subrow?.[col.key as keyof typeof subrow]
                      }}</slot>
                    </div>
                  </div>

                  <div
                    v-else
                    :class="{
                      'border-slate-400/50 w-full px-4': col.sticky,
                      'border-r-2': hasScrollbar && !arrivedState.left && col.sticky === 'left',
                      'border-l-2': hasScrollbar && !arrivedState.right && col.sticky === 'right',
                    }"
                  >
                    <slot :name="col.key" :row>{{ row[col.key as keyof typeof row] }}</slot>
                  </div>
                </Cell>
              </Row>

              <slot name="collapsible" :row></slot>
            </template>

            <slot name="spanable"></slot>
          </tbody>

          <tbody v-else>
            <Row class="bg-gray-200/20">
              <Cell :colspan="selectable ? Number(columns?.length) + 1 : columns?.length">
                <div class="w-full !min-h-379.5px flex flex-col justify-center items-center">
                  <div class="text-xl font-medium text-stone-300">
                    {{ locale.noData || 'No data to display' }}
                  </div>
                </div>
              </Cell>
            </Row>
          </tbody>
        </slot>
      </table>
    </div>

    <div
      v-if="typeof count === 'number'"
      class="flex flex-col md:flex-row items-center justify-end p-4 gap-4 text-sm"
    >
      <div class="Table-RowsPerPage">
        {{ locale.rowsPerPage || 'Rows per page:' }}
        <div class="w-20 ml-2">
          <Select
            v-model:value="rowsPerPage"
            :options="[
              { label: '10', value: 10 },
              { label: '25', value: 25 },
              { label: '50', value: 50 },
              { label: '100', value: 100 },
            ]"
            :disabled="loading"
            class="!border-transparent"
            @change="onRowsPerPageChange"
          />
        </div>
      </div>

      <div class="flex items-center">{{ paginationInfo }}</div>

      <div class="flex gap-4">
        <Button
          prepend="i-material-symbols-chevron-left-rounded"
          :label="locale.previousPage || 'Previous'"
          variant="text"
          color="secondary"
          :disabled="!count || currentPage === 1 || loading"
          @click="onPreviousPage"
        />
        <Button
          :label="locale.nextPage || 'Next'"
          append="i-material-symbols-chevron-right-rounded"
          variant="text"
          color="secondary"
          :disabled="!count || currentPage === Math.ceil(count / rowsPerPage) || loading"
          @click="onNextPage"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Table-Wrapper {
  @apply w-full overflow-auto;
}

.Table-Element {
  @apply w-full border-collapse;
}

:deep(.Checkbox-Label) {
  @apply !min-h-auto;
}

.selected {
  @apply !bg-primary-50 !hover:bg-primary-100 !dark:bg-primary-950 !dark:hover:bg-primary-900;
}

.Table-RowsPerPage {
  @apply flex items-center;
}

.sticky-tr:hover {
  .sticky-col {
    @apply !bg-inherit;
  }
}
</style>
