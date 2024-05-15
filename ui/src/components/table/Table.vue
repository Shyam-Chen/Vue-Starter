<script lang="ts" setup generic="T extends object">
import type { VNode } from 'vue';
import { ref, computed, reactive, watch, watchEffect, toRef } from 'vue';
import { useLocaler, useLocale } from 'vue-localer';
import { useScroll } from '@vueuse/core';

import type staticTable from '../../utilities/static-table/staticTable';
import Spinner from '../spinner/Spinner.vue';
import Button from '../button/Button.vue';
import Select from '../select/Select.vue';
import Checkbox from '../checkbox/Checkbox.vue';

import type { ColumnItem, Control } from './types';
import Column from './Column.vue';
import Row from './Row.vue';
import Cell from './Cell.vue';

const props = defineProps<{
  value?: T[];

  columns?: ColumnItem[];
  rows?: T[];

  static?: typeof staticTable;

  count?: number;
  control?: Control;

  selectable?: boolean;
  selected?: T[];

  stickyHeader?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: T[]): void;
  (evt: 'update:selected', val: T[]): void;
  (evt: 'change', val: { rows?: number; page?: number; field?: string; direction?: string }): void;
  (evt: 'clickRow', val: T): void;
  (
    evt: 'update:control',
    val: { rows?: number; page?: number; field?: string; direction?: string },
  ): void;
  (evt: 'selecteAll', val: boolean, arr: T[]): void;
}>();

defineSlots<{
  thead(props: {}): VNode;
  tbody(props: {}): VNode;
  [colKey: string]: (props: { row: T }) => VNode;
  collapsible(props: { row: T }): VNode;
  spanable(props: {}): VNode;
}>();

const localer = useLocaler();
const locale = useLocale();

const valueModel = computed({
  get: () => props.value || [],
  set: (val) => emit('update:value', val),
});

const countRef = toRef(props, 'count', undefined);

const controlModel = computed({
  get: () => {
    if (
      !props.control ||
      (typeof props.control === 'object' && Object.keys(props.control).length === 0)
    ) {
      return { rows: 10, page: 1, field: 'createdAt', direction: 'desc' };
    }

    return props.control;
  },
  set: (val) => emit('update:control', val),
});

const flux = reactive({
  rows: [] as any[],

  indeterminate: false,
  selecteAll: false,

  rowsPerPage: 10,
  rowsPerPageOptions: [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '50', value: 50 },
  ],
  currentPage: 1,
  previousPage() {
    if (flux.currentPage === 1) return;
    flux.currentPage -= 1;
    flux._updateChange();
  },
  nextPage() {
    if (flux.currentPage === Math.ceil(countRef.value / flux.rowsPerPage)) return;
    flux.currentPage += 1;
    flux._updateChange();
  },

  sortField: 'createdAt' as string | undefined,
  sortDirection: 'desc' as string | undefined,
  onSort(col: any) {
    if (props.loading) return;

    if (flux.sortDirection === 'asc') {
      flux.sortField = col.key;
      flux.sortDirection = 'desc';
    } else if (flux.sortDirection === 'desc') {
      flux.sortField = col.key;
      flux.sortDirection = 'asc';
    }

    flux._updateChange();
  },

  _updateChange() {
    emit('change', {
      rows: flux.rowsPerPage,
      page: flux.currentPage,
      field: flux.sortField,
      direction: flux.sortDirection,
    });

    controlModel.value = {
      rows: flux.rowsPerPage,
      page: flux.currentPage,
      field: flux.sortField,
      direction: flux.sortDirection,
    };
  },

  clickRow(row: T) {
    emit('clickRow', row);
  },
});

const paginationInfo = computed(() => {
  if (locale.value.paginationInfo) {
    return localer.f(locale.value.paginationInfo, [
      flux.currentPage * flux.rowsPerPage - flux.rowsPerPage + 1,
      flux.currentPage * flux.rowsPerPage > countRef.value
        ? countRef.value
        : flux.currentPage * flux.rowsPerPage,
      countRef.value,
    ]);
  }

  return `${flux.currentPage * flux.rowsPerPage - flux.rowsPerPage + 1}-${
    flux.currentPage * flux.rowsPerPage > countRef.value
      ? countRef.value
      : flux.currentPage * flux.rowsPerPage
  } of ${countRef.value}`;
});

watch(
  () => controlModel.value,
  (val) => {
    if (Object.keys(val)?.length) {
      flux.rowsPerPage = val.rows || 10;
      flux.currentPage = val.page || 1;
      flux.sortField = val.field || 'createdAt';
      flux.sortDirection = val.direction || 'desc';

      if (props.static && props.rows?.length) {
        flux.rows = props.static(props.rows, controlModel.value);
      }
    }
  },
  { immediate: true },
);

watch(
  () => flux.rowsPerPage,
  () => {
    flux.currentPage = 1;
    flux._updateChange();
  },
);

watch(
  () => flux.selecteAll,
  (val) => {
    if (props.static) {
      const arr = props.rows?.map((item) => ({ ...item, checked: val })) || [];
      flux.rows = props.static(arr, controlModel.value);

      arr.forEach((row: any) => {
        const found: any = valueModel.value.find((item: any) =>
          item._id ? item._id === row._id : item.id === row.id,
        );
        if (found) found.checked = val;
      });
    } else {
      flux.rows = props.rows?.map((item) => ({ ...item, checked: val })) || [];
    }
  },
);

watch(
  () => props.rows,
  (val) => {
    if (props.static && props.rows?.length) {
      flux.rows = props.static(props.rows, controlModel.value);

      const checked = props.rows.every((item: any) => item.checked);
      const unchecked = props.rows.every((item: any) => !item.checked);
      flux.indeterminate = !(checked || unchecked);
      if (checked) flux.selecteAll = true;
      if (unchecked) flux.selecteAll = false;
    } else {
      flux.rows = val || [];
    }
  },
  { deep: true, immediate: true },
);

watch(
  () => flux.rows,
  (val) => {
    if (props.static && val?.length) {
      val.forEach((row) => {
        const found: any = valueModel.value.find((item: any) =>
          item._id ? item._id === row._id : item.id === row.id,
        );
        if (found) found.checked = row.checked;
      });
    }

    if (!props.static) {
      const checked = val.every((item) => item.checked);
      const unchecked = val.every((item) => !item.checked);

      flux.indeterminate = !(checked || unchecked);

      if (checked) flux.selecteAll = true;
      if (unchecked) flux.selecteAll = false;

      emit(
        'update:selected',
        val.filter((item) => item.checked),
      );
    }
  },
  { deep: true },
);

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
              <Checkbox v-model:value="flux.selecteAll" :indeterminate="flux.indeterminate" />
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
                @click="flux.onSort(col)"
              >
                <div>{{ col.name }}</div>

                <template v-if="typeof col.sortable === 'boolean' ? col.sortable : true">
                  <div
                    v-if="flux.sortField === col.key && flux.sortDirection === 'desc'"
                    class="i-ph-sort-descending-bold size-5"
                  ></div>

                  <div
                    v-else-if="flux.sortField === col.key && flux.sortDirection === 'asc'"
                    class="i-ph-sort-ascending-bold size-5"
                  ></div>

                  <div v-else class="i-flowbite-sort-outline size-5"></div>
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
          <tbody v-if="flux.rows?.length">
            <template v-for="row in flux.rows" :key="row._id || row.id">
              <Row
                class="sticky-tr"
                :class="{ selected: selectable && row.checked }"
                @click="flux.clickRow(row)"
              >
                <Cell v-if="selectable">
                  <Checkbox v-model:value="row.checked" />
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
                    :class="{ 'py-2': row.details?.length > 1 }"
                  >
                    <div v-for="(sub, subIdx) in row.details" :key="subIdx">
                      <slot :name="col.key" :row="row">
                        {{ sub[col.key] }}
                      </slot>
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
                    <slot :name="col.key" :row="row">
                      {{ row[col.key] }}
                    </slot>
                  </div>
                </Cell>
              </Row>

              <slot name="collapsible" :row="row"></slot>
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
      v-if="typeof countRef === 'number'"
      class="flex flex-col md:flex-row items-center justify-end p-4 gap-4 text-sm"
    >
      <div class="Table-RowsPerPage">
        {{ locale.rowsPerPage || 'Rows per page:' }}
        <div class="w-auto ml-2">
          <Select
            v-model:value="flux.rowsPerPage"
            :options="flux.rowsPerPageOptions"
            :disabled="loading"
            class="!border-transparent"
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
          :disabled="loading"
          @click="flux.previousPage"
        />
        <Button
          :label="locale.nextPage || 'Next'"
          append="i-material-symbols-chevron-right-rounded"
          variant="text"
          color="secondary"
          :disabled="loading"
          @click="flux.nextPage"
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
