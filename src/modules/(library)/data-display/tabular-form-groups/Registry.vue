<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { string } from 'yup';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const state = reactive({
  listGroup: [
    {
      parent: 'O',
      children: [
        { firstField: 'O', secondField: '' },
        { firstField: '', secondField: 'O' },
        { firstField: 'O', secondField: 'O' },
        { firstField: '', secondField: '' },
      ],
    },
    {
      parent: '',
      children: [
        { firstField: '', secondField: 'O' },
        { firstField: 'O', secondField: '' },
        { firstField: '', secondField: '' },
        { firstField: 'O', secondField: 'O' },
      ],
    },
  ],
  errors: {} as Record<string, string>,
});

const schema = useSchema(
  [
    [
      computed(() => state.listGroup),
      (row: any) => [
        [computed(() => row.parent), computed(() => string().required())],
        [
          computed(() => row.children),
          (subRow: any) => [
            [computed(() => subRow.firstField), computed(() => string().required())],
            [computed(() => subRow.secondField), computed(() => string().required())],
          ],
        ],
      ],
    ],
  ],
  state,
);

schema.validate();
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Display', disabled: true },
      { text: 'Tabular Form Groups', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Tabular Form Groups</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic (Tabs + Tables)</div>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
