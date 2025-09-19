<script lang="ts" setup>
import { XBreadcrumb, XButton, XCard, XCollapse, XDivider, XTable } from '@x/ui';
import { reactive } from 'vue';

import Basic from './Basic.vue';
import Controllable from './Controllable.vue';
import Draggable from './Draggable.vue';
import Loading from './Loading.vue';
import Selectable from './Selectable.vue';

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
    { key: 'percent', name: 'Percent', spanable: true },
    { key: 'status', name: 'Status' },
  ],
  spanableRows: [
    {
      name: 'Martin Blank',
      email: 'martinblank@mail.com',
      details: [{ score: 32, percent: 50 }, { score: 55 }, { score: 21, percent: 82 }],
      status: 'Active',
    },
    {
      name: 'Fran Wilson',
      email: 'franwilson@mail.com',
      details: [{ score: 34 }, { percent: 57 }],
      status: 'Active',
    },
    {
      name: 'Maria Anders',
      email: 'mariaanders@mail.com',
      details: [
        { score: 51, percent: 31 },
        { score: 32, percent: 72 },
      ],
      status: 'Active',
    },
  ],

  collapsibleCols: [
    { key: 'icon', name: '', sortable: false },
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email' },
    { key: 'status', name: 'Status' },
    { key: 'actions', name: 'Actions', sortable: false },
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
  rowClick(row: any) {
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
    { key: 'cost', name: 'Cost', class: '!text-right' },
    { key: 'income', name: 'Income', class: '!text-right' },
    { key: 'lastCost', name: 'Cost', class: '!text-right' },
    { key: 'lastIncome', name: 'Income', class: '!text-right' },
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
      <XTable stickyHeader :columns="flux.columns1" :rows="flux.dataTable1">
        <template #email="{ row }">
          <div class="w-50 truncate">{{ row.email }}</div>
        </template>

        <template #address="{ row }">
          <div class="w-50 truncate">{{ row.address }}</div>
        </template>
      </XTable>
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

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Selectable</h2>

    <XCard>
      <Selectable />
    </XCard>
  </section>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Collapsible</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable
        stickyHeader
        :columns="flux.collapsibleCols"
        :rows="flux.collapsibleRows"
        :count="77"
        @rowClick="flux.rowClick"
      >
        <template #icon="{ row }">
          <XButton
            :icon="
              row.collapsible
                ? 'i-material-symbols-keyboard-arrow-up-rounded'
                : 'i-material-symbols-keyboard-arrow-down-rounded'
            "
            color="secondary"
            variant="text"
            size="small"
            @click.stop="flux.clickCollapsible(row)"
          />
        </template>

        <template #actions>
          <XButton label="Edit" color="info" variant="text" size="small" @click.stop />
          <XButton label="Delete" color="danger" variant="text" size="small" @click.stop />
        </template>

        <template #collapsible="{ row }">
          <tr>
            <td :colspan="flux.collapsibleCols.length" class="empty:hidden">
              <XCollapse>
                <div v-if="row.collapsible">
                  <div class="p-4">
                    <div class="text-2xl mb-2">History</div>
                    <XTable :columns="flux.colspanCols" :rows="flux.colspanRows" />
                  </div>

                  <XDivider class="!my-0" />
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
      <XTable :columns="flux.spanableCols" :rows="flux.spanableRows">
        <template #score="{ subrow }">
          {{ subrow.score || '-' }}
        </template>

        <template #percent="{ subrow }">
          {{ subrow.percent || '-' }}
        </template>
      </XTable>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Colspan</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable :columns="flux.colspanCols" :rows="flux.colspanRows">
        <template #spanable>
          <XTable.Row>
            <XTable.Cell colspan="2">Sum:</XTable.Cell>
            <XTable.Cell>108</XTable.Cell>
            <XTable.Cell />
          </XTable.Row>
        </template>
      </XTable>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Colspan (thead)</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable :columns="flux.colspanTheadCols" :rows="flux.colspanTheadRows">
        <template #thead>
          <XTable.Row>
            <XTable.Column colspan="2"></XTable.Column>
            <XTable.Column colspan="2" class="!text-center">2023</XTable.Column>
            <XTable.Column colspan="2" class="!text-center">2022</XTable.Column>
            <XTable.Column></XTable.Column>
          </XTable.Row>
        </template>

        <template #spanable>
          <XTable.Row>
            <XTable.Cell colspan="2">Sum:</XTable.Cell>
            <XTable.Cell class="!text-right">108</XTable.Cell>
            <XTable.Cell class="!text-right">154</XTable.Cell>
            <XTable.Cell class="!text-right">152</XTable.Cell>
            <XTable.Cell class="!text-right">198</XTable.Cell>
            <XTable.Cell></XTable.Cell>
          </XTable.Row>
        </template>
      </XTable>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Colspan (thead + stickyHeader)</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable
        stickyHeader
        :columns="flux.colspanTheadCols"
        :rows="[
          ...flux.colspanTheadRows,
          ...flux.colspanTheadRows,
          ...flux.colspanTheadRows,
          ...flux.colspanTheadRows,
          ...flux.colspanTheadRows,
        ]"
      >
        <template #thead>
          <XTable.Row class="sticky top-0 z-10">
            <XTable.Column colspan="2"></XTable.Column>
            <XTable.Column colspan="2" class="!text-center">2023</XTable.Column>
            <XTable.Column colspan="2" class="!text-center">2022</XTable.Column>
            <XTable.Column></XTable.Column>
          </XTable.Row>
        </template>

        <template #spanable>
          <XTable.Row class="sticky bottom-0 z-10 bg-white">
            <XTable.Cell colspan="2">Sum:</XTable.Cell>
            <XTable.Cell class="!text-right">108</XTable.Cell>
            <XTable.Cell class="!text-right">154</XTable.Cell>
            <XTable.Cell class="!text-right">152</XTable.Cell>
            <XTable.Cell class="!text-right">198</XTable.Cell>
            <XTable.Cell></XTable.Cell>
          </XTable.Row>
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
