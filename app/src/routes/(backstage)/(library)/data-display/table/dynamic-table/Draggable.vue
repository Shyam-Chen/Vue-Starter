<script lang="ts" setup>
import { reactive } from 'vue';
import Draggable from 'vuedraggable';
import { XTable } from '@x/ui';

const flux = reactive({
  draggableTableCols: [
    { key: '', name: '', sortable: false },
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email' },
    { key: 'address', name: 'Address' },
    { key: 'phone', name: 'Phone' },
    { key: 'dateCreated', name: 'Date Created' },
    { key: 'role', name: 'Role' },
    { key: 'status', name: 'Status' },
  ],
  draggableTableRows: [
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
});
</script>

<template>
  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Draggable</div>

    <div class="w-full bg-white dark:bg-slate-800 shadow-md rounded">
      <XTable :columns="flux.draggableTableCols" :count="77">
        <template #tbody>
          <Draggable v-model="flux.draggableTableRows" tag="tbody" handle=".handle" itemKey="name">
            <template #item="{ element }">
              <XTable.Row>
                <XTable.Cell>
                  <div
                    class="min-h-38px i-ic-baseline-drag-indicator handle w-6 h-6 cursor-move"
                  ></div>
                </XTable.Cell>

                <XTable.Cell>{{ element.name }} </XTable.Cell>
                <XTable.Cell>{{ element.email }}</XTable.Cell>
                <XTable.Cell>{{ element.address }}</XTable.Cell>
                <XTable.Cell>{{ element.phone }}</XTable.Cell>
                <XTable.Cell>{{ element.dateCreated }}</XTable.Cell>
                <XTable.Cell>{{ element.role }}</XTable.Cell>
                <XTable.Cell>{{ element.status }}</XTable.Cell>
              </XTable.Row>
            </template>
          </Draggable>
        </template>
      </XTable>
    </div>
  </div>
</template>
