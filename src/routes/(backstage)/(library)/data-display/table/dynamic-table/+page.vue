<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XTable, XCollapse, XButton } from '@x/ui';

import Basic from './Basic.vue';
import Loading from './Loading.vue';
import Controllable from './Controllable.vue';
import Draggable from './Draggable.vue';

const data = [
  {
    name: 'Thomas Hardy',
    email: 'thomashardy@mail.com, thomas.hardy@mail.com',
    address: '89 Chiaroscuro Rd, Portland, USA',
    phone: '(171) 555-2222',
    dateCreated: '04/10/2013',
    role: 'Admin',
    status: 'Active',
  },
  {
    name: 'Dominique Perrier',
    email: 'dominiqueperrier@mail.com',
    address: 'Obere Str. 57, Berlin, Germany',
    phone: '(313) 555-5735',
    dateCreated: '05/08/2014',
    role: 'Publisher',
    status: 'Active',
  },
  {
    name: 'Maria Anders',
    email: 'mariaanders@mail.com',
    address: '25, rue Lauriston, Paris, France',
    phone: '(503) 555-9931',
    dateCreated: '11/05/2015',
    role: 'Publisher',
    status: 'Suspended',
  },
  {
    name: 'Fran Wilson',
    email: 'franwilson@mail.com',
    address: 'C/ Araquil, 67, Madrid, Spain',
    phone: '(204) 619-5731',
    dateCreated: '06/09/2016',
    role: 'Reviewer',
    status: 'Active',
  },
  {
    name: 'Martin Blank',
    email: 'martinblank@mail.com',
    address: 'Via Monte Bianco 34, Turin, Italy',
    phone: '(480) 631-2097',
    dateCreated: '12/08/2017',
    role: 'Moderator',
    status: 'Inactive',
  },
];

const flux = reactive({
  dataTable1: [...data, ...data, ...data, ...data],
  table: data,
  columns1: [
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email', sortable: false },
    { key: 'address', name: 'Address' },
    { key: 'phone', name: 'Phone' },
    { key: 'dateCreated', name: 'Date Created' },
    { key: 'role', name: 'Role' },
    { key: 'status', name: 'Status' },
  ],
  columns2: [
    { key: 'name', name: 'Name', sticky: 'left' },
    { key: 'email', name: 'Email' },
    { key: 'address', name: 'Address' },
    { key: 'phone', name: 'Phone' },
    { key: 'dateCreated', name: 'Date Created' },
    { key: 'role', name: 'Role' },
    { key: 'status', name: 'Status', sticky: 'right' },
  ],

  tableChange: {},
  onTableChange(evt: any) {
    flux.tableChange = evt;
  },

  selected: [],
  selectedName(selected: any[]) {
    return selected.map((item) => item.name).join(', ');
  },

  spanableCols: [
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email' },
    { key: 'score', name: 'Score', spanable: true },
    { key: 'status', name: 'Status' },
  ],
  spanableRows: [
    {
      name: 'Martin Blank',
      email: 'martinblank@mail.com',
      details: [{ score: 32 }, { score: 55 }, { score: 21 }],
      status: 'Active',
    },
    {
      name: 'Fran Wilson',
      email: 'franwilson@mail.com',
      details: [{ score: 34 }],
      status: 'Active',
    },
    {
      name: 'Maria Anders',
      email: 'mariaanders@mail.com',
      details: [{ score: 51 }, { score: 32 }],
      status: 'Active',
    },
  ],

  collapsibleCols: [
    { key: 'icon', name: '', sortable: false },
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email' },
    { key: 'status', name: 'Status' },
  ],
  collapsibleRows: [
    {
      name: 'Martin Blank',
      email: 'martinblank@mail.com',
      details: [{ score: 32 }, { score: 55 }, { score: 21 }],
      status: 'Active',
    },
    {
      name: 'Fran Wilson',
      email: 'franwilson@mail.com',
      details: [{ score: 34 }],
      status: 'Active',
    },
    {
      name: 'Maria Anders',
      email: 'mariaanders@mail.com',
      details: [{ score: 51 }, { score: 32 }],
      status: 'Active',
    },
  ].map((item) => ({ ...item, collapsible: false })),
  clickRow(row: any) {
    console.log(row);
  },
  clickCollapsible(row: any) {
    row.collapsible = !row.collapsible;
  },

  colspanCols: [
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email' },
    { key: 'score', name: 'Score' },
    { key: 'status', name: 'Status' },
  ],
  colspanRows: [
    {
      name: 'Martin Blank',
      email: 'martinblank@mail.com',
      score: 32,
      status: 'Active',
    },
    {
      name: 'Fran Wilson',
      email: 'franwilson@mail.com',
      score: 55,
      status: 'Active',
    },
    {
      name: 'Maria Anders',
      email: 'mariaanders@mail.com',
      score: 21,
      status: 'Active',
    },
  ],

  colspanTheadCols: [
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email' },
    { key: 'cost', name: 'Cost' },
    { key: 'income', name: 'Income' },
    { key: 'lastCost', name: 'Cost' },
    { key: 'lastIncome', name: 'Income' },
    { key: 'status', name: 'Status' },
  ],
  colspanTheadRows: [
    {
      name: 'Martin Blank',
      email: 'martinblank@mail.com',
      cost: 32,
      income: 44,
      lastCost: 77,
      lastIncome: 49,
      status: 'Active',
    },
    {
      name: 'Fran Wilson',
      email: 'franwilson@mail.com',
      cost: 55,
      income: 29,
      lastCost: 31,
      lastIncome: 50,
      status: 'Active',
    },
    {
      name: 'Maria Anders',
      email: 'mariaanders@mail.com',
      cost: 21,
      income: 81,
      lastCost: 44,
      lastIncome: 99,
      status: 'Active',
    },
  ],
});
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Display' },
      { text: 'Table' },
      { text: 'Dynamic Table' },
    ]"
  />

  <div class="text-4xl font-extrabold my-4">Dynamic Table</div>

  <Basic class="my-8" />

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable :columns="flux.columns1" :rows="flux.table" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Sticky Header</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable stickyHeader :columns="flux.columns1" :rows="flux.dataTable1" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Paginable and Sortable</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable
        :columns="flux.columns1"
        :rows="flux.table"
        :count="77"
        @change="flux.onTableChange"
      />
    </div>

    <div class="mt-2">{{ flux.tableChange }}</div>
  </div>

  <Loading />

  <Controllable />

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Selectable</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable
        v-model:selected="flux.selected"
        selectable
        :columns="flux.columns1"
        :rows="flux.table"
      />
    </div>

    <div class="mt-2">{{ flux.selectedName(flux.selected) }}</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Collapsible</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable
        stickyHeader
        :columns="flux.collapsibleCols"
        :rows="flux.collapsibleRows"
        :count="77"
        @clickRow="flux.clickRow"
      >
        <template #icon="{ row }">
          <XButton
            v-if="!row.collapsible"
            icon="i-fa-caret-down"
            color="secondary"
            variant="text"
            @click.stop="flux.clickCollapsible(row)"
          />
          <XButton
            v-if="row.collapsible"
            icon="i-fa-caret-up"
            color="secondary"
            variant="text"
            @click.stop="flux.clickCollapsible(row)"
          />
        </template>

        <template #collapsible="{ row }">
          <tr>
            <td :colspan="flux.collapsibleCols.length" class="py-0">
              <XCollapse>
                <div v-if="row.collapsible">
                  <div class="px-4 py-2">
                    <div class="text-2xl mb-2">History</div>
                    <XTable :columns="flux.colspanCols" :rows="flux.colspanRows" />
                  </div>
                </div>
              </XCollapse>
            </td>
          </tr>
        </template>
      </XTable>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Rowspan (key: `details`)</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable :columns="flux.spanableCols" :rows="flux.spanableRows" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Colspan</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable :columns="flux.colspanCols" :rows="flux.colspanRows">
        <template #spanable>
          <tr>
            <td colspan="2" class="px-6 py-3">Sum:</td>
            <td class="px-6 py-3">108</td>
            <td></td>
          </tr>
        </template>
      </XTable>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Colspan (thead)</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable :columns="flux.colspanTheadCols" :rows="flux.colspanTheadRows">
        <template #thead>
          <tr class="bg-blueGray-200 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200">
            <th colspan="2" class="px-6 py-3"></th>
            <th colspan="2" class="px-6 py-3 text-center">2023</th>
            <th colspan="2" class="px-6 py-3 text-center">2022</th>
            <th></th>
          </tr>
        </template>

        <template #spanable>
          <tr>
            <td colspan="2" class="px-6 py-3">Sum:</td>
            <td class="px-6 py-3">108</td>
            <td class="px-6 py-3">154</td>
            <td class="px-6 py-3">152</td>
            <td class="px-6 py-3">198</td>
            <td></td>
          </tr>
        </template>
      </XTable>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Sticky Columns</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable stickyHeader :columns="flux.columns2" :rows="flux.dataTable1" />
    </div>
  </div>

  <Draggable />

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Export data to Excel (TODO)</div>
  </div>
</template>
