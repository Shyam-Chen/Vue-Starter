<script lang="ts" setup>
import { reactive, watch, toRef } from 'vue';
import omit from 'lodash/omit';

import ProgressBar from './ProgressBar.vue';
import Button from './Button.vue';
import Select from './Select.vue';
import Checkbox from './Checkbox.vue';

interface TableControl {
  rows?: number;
  page?: number;
  field?: string;
  direction?: string;
}

const props = defineProps<{
  columns?: any[];
  rows?: any[];
  count?: number;
  stickyHeader?: boolean;
  selectable?: boolean;
  selected?: any[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:selected', val: any[]): void;
  (evt: 'change', val: TableControl): void;
}>();

const countRef = toRef(props, 'count', 0);

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
  },
});

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
    flux.rows = props.rows?.map((item) => ({ ...item, checked: val })) || [];
  },
);

watch(
  () => props.rows,
  (val) => {
    flux.rows = val || [];
  },
  { deep: true, immediate: true },
);

watch(
  () => flux.rows,
  (val) => {
    if (val) {
      const checked = val.every((item) => item.checked);
      const unchecked = val.every((item) => !item.checked);

      flux.indeterminate = !(checked || unchecked);

      if (checked) flux.selecteAll = true;
      if (unchecked) flux.selecteAll = false;

      emit(
        'update:selected',
        val.filter((item) => item.checked).map((item) => omit(item, ['checked'])),
      );
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

    <div class="w-full overflow-auto" :class="{ 'max-h-100': stickyHeader }">
      <table class="items-center w-full border-collapse">
        <thead class="thead-light">
          <tr :class="{ 'sticky top-0 z-10': stickyHeader }">
            <th
              v-if="selectable"
              class="px-6 bg-blueGray-200 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200 align-middle border border-solid border-blueGray-100 dark:border-blueGray-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="{ 'important:border-0': stickyHeader }"
            >
              <Checkbox v-model:value="flux.selecteAll" :indeterminate="flux.indeterminate" />
            </th>

            <th
              v-for="col in columns"
              :key="col.key"
              class="px-6 bg-blueGray-200 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200 align-middle border border-solid border-blueGray-100 dark:border-blueGray-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="{
                'important:border-0': stickyHeader,
                'sticky left-0 z-5': col.sticky === 'left',
                'sticky right-0 z-5': col.sticky === 'right',
              }"
            >
              <div
                class="inline-flex gap-1 items-center"
                :class="{
                  'cursor-pointer':
                    countRef && typeof col.sortable === 'boolean' ? col.sortable : true,
                }"
                @click="flux.onSort(col)"
              >
                <div>{{ col.name }}</div>

                <template
                  v-if="countRef && typeof col.sortable === 'boolean' ? col.sortable : true"
                >
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
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, idx) in flux.rows"
            :key="row._id || idx"
            class="sticky-tr hover:bg-slate-100 dark:hover:bg-slate-600 border-b last:border-b-0 dark:border-slate-600"
          >
            <td v-if="selectable" class="px-6 py-3 align-middle whitespace-nowrap">
              <Checkbox v-model:value="row.checked" />
            </td>

            <td
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-3 align-middle whitespace-nowrap"
              :class="{
                'sticky-col sticky left-0 z-5 bg-white dark:bg-slate-800 important:p-0':
                  col.sticky === 'left',
                'sticky-col sticky right-0 z-5 bg-white dark:bg-slate-800 important:p-0':
                  col.sticky === 'right',
              }"
            >
              <div v-if="col.spanable" class="flex flex-col gap-2">
                <div v-for="(sub, subIdx) in row.details" :key="subIdx">
                  <slot :name="col.key" :row="row">
                    {{ sub[col.key] }}
                  </slot>
                </div>
              </div>

              <div
                v-else
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
            </td>
          </tr>

          <slot name="spanable"></slot>
        </tbody>
      </table>
    </div>

    <div v-if="countRef" class="flex items-center justify-end p-4 space-x-6 text-slate-500">
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
</template>

<style lang="scss" scoped>
.sticky-tr:hover {
  .sticky-col {
    @apply important:bg-inherit;
  }
}
</style>
