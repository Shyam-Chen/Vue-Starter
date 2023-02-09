<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Table from '~/components/Table.vue';

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
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Display', disabled: true },
      { text: 'Data tables', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Table</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <Table :columns="flux.columns1" :rows="flux.table" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Sticky Header</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <Table stickyHeader :columns="flux.columns1" :rows="flux.dataTable1" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Paginable and Sortable</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <Table :columns="flux.columns1" :rows="flux.table" :count="77" @change="flux.onTableChange" />
    </div>

    <div class="mt-2">{{ flux.tableChange }}</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Selectable</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <Table
        v-model:selected="flux.selected"
        selectable
        :columns="flux.columns1"
        :rows="flux.table"
      />
    </div>

    <div class="mt-2">{{ flux.selectedName(flux.selected) }}</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Rowspan</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <Table :columns="flux.spanableCols" :rows="flux.spanableRows" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Colspan</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <Table :columns="flux.colspanCols" :rows="flux.colspanRows">
        <template #spanable>
          <tr>
            <td colspan="2" class="px-6 py-3">Sum:</td>
            <td class="px-6 py-3">108</td>
            <td></td>
          </tr>
        </template>
      </Table>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Sticky Columns</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <Table stickyHeader :columns="flux.columns2" :rows="flux.dataTable1" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Loading</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <Table stickyHeader loading :columns="flux.columns1" :rows="flux.dataTable1" :count="77" />
    </div>
  </div>
</template>
