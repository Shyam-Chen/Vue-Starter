<script lang="ts" setup generic="T extends object">
import type { VNode } from 'vue';
import { computed, reactive, watch, toRef } from 'vue';

import type staticTable from '../../utilities/static-table/staticTable';
import ProgressBar from '../progress-bar/ProgressBar.vue';
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

const tableValue = computed({
  get: () => props.value || [],
  set: (val) => emit('update:value', val),
});

const countRef = toRef(props, 'count', 0);

const controlValue = computed({
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

    controlValue.value = {
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

watch(
  () => controlValue.value,
  (val) => {
    if (Object.keys(val)?.length) {
      flux.rowsPerPage = val.rows || 10;
      flux.currentPage = val.page || 1;
      flux.sortField = val.field || 'createdAt';
      flux.sortDirection = val.direction || 'desc';

      if (props.static && props.rows?.length) {
        flux.rows = props.static(props.rows, controlValue.value);
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
      flux.rows = props.static(arr, controlValue.value);

      arr.forEach((row: any) => {
        const found: any = tableValue.value.find((item: any) => item.id === row.id);
        if (found) found.checked = val;
      });
    }
  },
);

watch(
  () => props.rows,
  (val) => {
    if (props.static && props.rows?.length) {
      flux.rows = props.static(props.rows, controlValue.value);
    } else {
      flux.rows = val || [];
    }
  },
  { deep: true, immediate: true },
);

watch(
  () => flux.rows,
  (val) => {
    if (val.length) {
      const checked = val.every((item) => item.checked);
      const unchecked = val.every((item) => !item.checked);

      flux.indeterminate = !(checked || unchecked);

      if (checked) flux.selecteAll = true;
      if (unchecked) flux.selecteAll = false;
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="relative">
    <div v-if="loading" class="absolute top-10 z-11 w-full">
      <ProgressBar />
    </div>

    <div class="Table-Wrapper" :class="{ 'max-h-100': stickyHeader }">
      <table class="Table-Element">
        <thead>
          <slot name="thead"></slot>

          <tr :class="{ 'sticky top-0 z-10': stickyHeader }">
            <Column v-if="selectable" :class="{ 'important:border-0': stickyHeader }">
              <Checkbox v-model:value="flux.selecteAll" :indeterminate="flux.indeterminate" />
            </Column>

            <Column
              v-for="col in columns"
              :key="col.key"
              :class="{
                'important:border-0': stickyHeader,
                'sticky left-0 z-5': col.sticky === 'left',
                'sticky right-0 z-5': col.sticky === 'right',
              }"
            >
              <div
                class="inline-flex gap-1 items-center min-h-38px"
                :class="{
                  'cursor-pointer': typeof col.sortable === 'boolean' ? col.sortable : true,
                }"
                @click="flux.onSort(col)"
              >
                <div>{{ col.name }}</div>

                <template v-if="typeof col.sortable === 'boolean' ? col.sortable : true">
                  <div
                    v-if="flux.sortField === col.key && flux.sortDirection === 'desc'"
                    class="i-fa-sort-desc w-3.5 h-3.5"
                  ></div>

                  <div
                    v-else-if="flux.sortField === col.key && flux.sortDirection === 'asc'"
                    class="i-fa-sort-asc w-3.5 h-3.5"
                  ></div>

                  <div v-else class="i-fa-sort w-3.5 h-3.5"></div>
                </template>
              </div>
            </Column>
          </tr>
        </thead>

        <slot name="tbody">
          <tbody v-if="flux.rows?.length">
            <template v-for="row in flux.rows" :key="row._id || row.id">
              <Row
                class="sticky-tr"
                :class="{ 'bg-primary-500/25 important:hover:bg-primary-500/50': row.checked }"
                @click="flux.clickRow(row)"
              >
                <Cell v-if="selectable">
                  <Checkbox v-model:value="row.checked" />
                </Cell>

                <Cell
                  v-for="col in columns"
                  :key="col.key"
                  :class="{
                    'sticky-col sticky left-0 z-5 bg-white dark:bg-slate-800 important:p-0':
                      col.sticky === 'left',
                    'sticky-col sticky right-0 z-5 bg-white dark:bg-slate-800 important:p-0':
                      col.sticky === 'right',
                  }"
                >
                  <div v-if="col.spanable" class="flex flex-col gap-2">
                    <div
                      v-for="(sub, subIdx) in row.details"
                      :key="subIdx"
                      class="min-h-38px flex items-center"
                    >
                      <slot :name="col.key" :row="row">
                        {{ sub[col.key] }}
                      </slot>
                    </div>
                  </div>

                  <div
                    v-else
                    class="min-h-38px flex items-center"
                    :class="{
                      'dark:border-slate-600 px-6 py-3': col.sticky,
                      'border-r-2': col.sticky === 'left',
                      'border-l-2': col.sticky === 'right',
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
            <Row>
              <Cell :colspan="selectable ? Number(columns?.length) + 1 : columns?.length">
                <div class="w-full min-h-100 flex flex-col justify-center items-center gap-2">
                  <div class="i-mdi-package-variant w-24 h-24"></div>
                  <div class="text-3xl font-bold">No Data</div>
                </div>
              </Cell>
            </Row>
          </tbody>
        </slot>
      </table>
    </div>

    <div
      v-if="countRef"
      class="flex flex-col md:flex-row items-center justify-end p-4 gap-4 text-sm"
    >
      <div class="flex items-center">
        Rows per page:
        <div class="w-20 ml-2">
          <Select
            v-model:value="flux.rowsPerPage"
            :options="flux.rowsPerPageOptions"
            display="label"
          />
        </div>
      </div>

      <div class="flex items-center">
        {{ flux.currentPage * flux.rowsPerPage - flux.rowsPerPage + 1 }}-{{
          flux.currentPage * flux.rowsPerPage > countRef
            ? countRef
            : flux.currentPage * flux.rowsPerPage
        }}
        of
        {{ countRef }}
      </div>

      <div class="flex gap-4">
        <Button variant="text" color="secondary" @click="flux.previousPage">
          <div class="i-fa-angle-left w-4 h-4"></div>
          Previous
        </Button>

        <Button variant="text" color="secondary" @click="flux.nextPage">
          Next
          <div class="i-fa-angle-right w-4 h-4"></div>
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Table-Wrapper {
  @apply w-full overflow-auto;
}

.Table-Element {
  @apply items-center w-full border-collapse;
}

.sticky-tr:hover {
  .sticky-col {
    @apply important:bg-inherit;
  }
}
</style>
~/utilities/static-table/staticTable
