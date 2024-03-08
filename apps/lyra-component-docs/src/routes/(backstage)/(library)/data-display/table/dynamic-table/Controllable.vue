<script lang="ts" setup>
import { reactive } from 'vue';
import { XTable, XButton } from '@lyra/ui';

const flux = reactive({
  cols: [
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email' },
    { key: 'address', name: 'Address' },
    { key: 'phone', name: 'Phone' },
    { key: 'dateCreated', name: 'Date Created' },
    { key: 'role', name: 'Role' },
    { key: 'status', name: 'Status' },
  ],
  rows: [
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
  ],
  control: { rows: 10, page: 1 },
});
</script>

<template>
  <div class="my-4 p-6 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg">
    <div class="text-lg">Controllable</div>

    <div class="my-4">
      <XTable v-model:control="flux.control" :columns="flux.cols" :rows="flux.rows" :count="177" />
    </div>

    <div class="flex flex-col gap-2">
      <div>{{ flux.control }}</div>
      <div><XButton @click="flux.control = { rows: 10, page: 1 }">Reset</XButton></div>
    </div>
  </div>
</template>
