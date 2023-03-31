<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { string } from 'yup';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const state = reactive({
  dataTable: [
    { firstField: 'O', secondField: '' },
    { firstField: '', secondField: 'O' },
    { firstField: 'O', secondField: 'O' },
    { firstField: '', secondField: '' },
  ],
  errors: {} as Record<string, string>,
});

const schema = useSchema(
  [
    [
      computed(() => state.dataTable),
      (row: any) => [
        [computed(() => row.firstField), computed(() => string().required())],
        [computed(() => row.secondField), computed(() => string().required())],
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
      { text: 'Tabular Forms', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Tabular Forms</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic (Tabs or Tables)</div>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
