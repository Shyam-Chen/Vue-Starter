<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import DataTable from '~/components/DataTable.vue';

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
  columns1: [
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email' },
    { key: 'address', name: 'Address' },
    { key: 'phone', name: 'Phone' },
    { key: 'dateCreated', name: 'Date Created' },
    { key: 'role', name: 'Role' },
    { key: 'status', name: 'Status' },
  ],
  columns2: [
    { key: 'name', name: 'Name', fixed: 'left', width: '12rem' },
    { key: 'email', name: 'Email' },
    { key: 'address', name: 'Address' },
    { key: 'phone', name: 'Phone' },
    { key: 'dateCreated', name: 'Date Created' },
    { key: 'role', name: 'Role' },
    { key: 'status', name: 'Status' },
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
    <div class="text-3xl font-bold">Data tables</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <DataTable
      title="Employee Details"
      :dataSource="flux.dataTable1"
      :columns="flux.columns1"
      :dataCount="123"
    />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Fixed columns</div>

    <DataTable
      title="Employee Details"
      :dataSource="flux.dataTable1"
      :columns="flux.columns2"
      :dataCount="123"
      fixed
    />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Selectable rows</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Expandable row</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Rowspan</div>
  </div>
</template>
