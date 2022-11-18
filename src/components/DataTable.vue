<script lang="ts" setup>
import { ref, computed, reactive, watch, onMounted } from 'vue';
import { useScroll } from '@vueuse/core';

import Button from './Button.vue';
import Select from './Select.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  dataCount: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // temporary
  fixed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['change', 'add', 'edit', 'remove']);

const dataSourceRef = computed<any[]>(() => props.dataSource || []);
const columnsRef = computed<any[]>(
  () =>
    props.columns?.map((item: any) => ({
      ...item,
      sortable: typeof item.sortable === 'boolean' ? item.sortable : true,
    })) || [],
);

const createOptions = (num: number) => {
  function range(start: number, end: number, step = 1) {
    return Array((end - start) / step + 1)
      .fill(0)
      .map((v, i) => start + i * step);
  }

  return range(1, num).map((item) => ({ label: String(item), value: item }));
};

const el = ref();
const scroll = useScroll(el);

const flux = reactive({
  rowHover: -1,

  rowsPerPage: 20,
  rowsPerPageOptions: [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '50', value: 50 },
  ],

  currentPage: 1,
  currentPageOptions: [{ label: '1', value: 1 }],
  totalPage: 1,

  add() {
    emit('add');
  },
  edit(item: any) {
    emit('edit', item);
  },
  remove(item: any) {
    emit('remove', item);
  },

  sortKey: undefined as string | undefined,
  sortDirection: undefined as string | undefined,
  sort(column: any) {
    if (!column.sortable || !dataSourceRef.value.length) {
      return;
    }

    if (!flux.sortDirection) {
      flux.sortKey = column.key;
      flux.sortDirection = 'asc';
    } else if (flux.sortDirection === 'asc') {
      flux.sortKey = column.key;
      flux.sortDirection = 'desc';
    } else if (flux.sortDirection === 'desc') {
      flux.sortKey = undefined;
      flux.sortDirection = undefined;
    }

    emit('change', {
      rowsPerPage: flux.rowsPerPage,
      currentPage: flux.currentPage,
      sortKey: flux.sortKey,
      sortDirection: flux.sortDirection,
    });
  },

  previousPage() {
    if (flux.currentPage === 1) {
      return;
    }
    flux.currentPage -= 1;
  },
  nextPage() {
    if (flux.currentPage === flux.totalPage) {
      return;
    }
    flux.currentPage += 1;
  },
});

watch(
  () => props.dataCount,
  (val) => {
    if (val) {
      flux.currentPage = 1;
      flux.totalPage = Math.ceil(val / flux.rowsPerPage);
      flux.currentPageOptions = createOptions(flux.totalPage);
    }
  },
);

watch(
  () => flux.rowsPerPage,
  (val) => {
    flux.totalPage = Math.ceil(props.dataCount / val);
    flux.currentPageOptions = createOptions(flux.totalPage);
    emit('change', {
      rowsPerPage: val,
      currentPage: flux.currentPage,
      sortDirection: flux.sortDirection,
      sortKey: flux.sortKey,
    });
  },
);

watch(
  () => flux.currentPage,
  (val) => {
    emit('change', {
      rowsPerPage: flux.rowsPerPage,
      currentPage: val,
      sortDirection: flux.sortDirection,
      sortKey: flux.sortKey,
    });
  },
);

onMounted(() => {
  scroll.x.value += 1;
  scroll.x.value -= 1;
  scroll.y.value += 1;
  scroll.y.value -= 1;
});

const scrollShadow = computed(() => {
  const stickyHeadHeight = 56;
  const top = `inset 0px ${stickyHeadHeight + 10}px 10px -10px #333`;
  const right = `inset ${-10 - (props.fixed ? 200 : 0)}px 0px 10px -10px #333`;
  const bottom = 'inset 0px -10px 10px -10px #333';
  const left = `inset ${10 + (props.fixed ? 192 : 0)}px 0px 10px -10px #333`;

  const shadows = Object.entries(scroll.arrivedState)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, value]) => !value)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([key, value]) => {
      if (key === 'top') return top;
      if (key === 'right') return right;
      if (key === 'bottom') return bottom;
      if (key === 'left') return left;
      return '';
    })
    .join(',');

  return shadows;
});
</script>

<template>
  <div class="w-full rounded shadow-lg bg-white">
    <!-- <div class="p-4 flex justify-between">
      <div>{{ title }}</div>
      <Button color="primary" icon="i-fa-plus" @click="flux.add">Add New</Button>
    </div> -->

    <div ref="el" class="overflow-auto w-full max-h-100" :style="{ 'box-shadow': scrollShadow }">
      <table class="data-table w-full">
        <thead class="thead">
          <tr class="sticky top-0 z-10">
            <td
              v-for="column in columnsRef"
              :key="column.key"
              :style="{
                cursor: column.sortable ? 'pointer' : 'auto',
                'min-width': column.width ? column.width : 'auto',
                'max-width': column.width ? column.width : 'auto',
              }"
              class="whitespace-nowrap p-4 font-bold bg-white"
              :class="{ 'sticky left-0 z-5': column.fixed }"
              @click="flux.sort(column)"
            >
              <div class="flex items-center">
                <div>
                  {{ column.name }}
                </div>

                <div v-if="column.sortable" class="ml-2">
                  <div
                    class="i-fa-caret-up w-3 h-3"
                    :class="{ active: flux.sortKey === column.key && flux.sortDirection === 'asc' }"
                  ></div>
                  <div
                    class="i-fa-caret-down w-3 h-3"
                    :class="{
                      active: flux.sortKey === column.key && flux.sortDirection === 'desc',
                    }"
                  ></div>
                </div>
              </div>
            </td>

            <div
              v-if="fixed"
              class="min-w-50 whitespace-nowrap p-4 font-bold bg-white sticky right-0 z-5"
            >
              Actions
            </div>
          </tr>
        </thead>

        <tbody class="tbody">
          <tr
            v-for="(item, index) in dataSourceRef"
            :key="index"
            class="tr"
            @mouseenter="flux.rowHover = index"
            @mouseleave="flux.rowHover = -1"
          >
            <td
              v-for="column in columnsRef"
              :key="column.key"
              class="p-4 whitespace-nowrap"
              :class="{ 'sticky left-0 z-5 bg-white': column.fixed }"
              :style="{
                'min-width': column.width ? column.width : 'auto',
                'max-width': column.width ? column.width : 'auto',
              }"
            >
              <slot :name="column.key" :item="item" :index="index">
                {{ item[column.key] }}
              </slot>
            </td>

            <div
              v-if="fixed"
              class="p-4 flex w-50 sticky right-0 z-1 bg-white"
              :class="{ 'data-table-actions-hover': flux.rowHover === index }"
            >
              <Button color="info" @click="flux.edit(item)">Edit</Button>
              <Button color="danger" class="ml-2" @click="flux.remove(item)">Remove</Button>
            </div>
          </tr>

          <!-- <div class="tr" v-if="!dataSourceRef.length">
            <div class="text-center">--</div>
          </div> -->
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-end p-4">
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

      <div class="ml-8 flex items-center">21-40 of {{ dataCount }}</div>

      <div
        class="ml-8 flex items-center cursor-pointer hover:bg-slate-200 px-2 py-1 rounded"
        @click="flux.previousPage"
      >
        <div class="i-fa-angle-left w-4 h-4 mr-1"></div>
        Previous
      </div>

      <div
        class="ml-6 flex items-center cursor-pointer hover:bg-slate-200 px-2 py-1 rounded"
        @click="flux.nextPage"
      >
        Next
        <div class="i-fa-angle-right w-4 h-4 ml-1"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tbody {
  & tr:hover {
    box-shadow: inset 0px 0px 10px 0 #333;
  }
}
</style>
