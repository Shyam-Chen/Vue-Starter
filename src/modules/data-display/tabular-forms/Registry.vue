<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { string } from 'yup';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const { t } = useI18n({ useScope: 'global' });

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
        [computed(() => row.firstField), computed(() => string().required(t('required')))],
        [computed(() => row.secondField), computed(() => string().required(t('required')))],
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
      { text: 'Platform', disabled: true },
      { text: 'Data Display', disabled: true },
      { text: 'Tabular Forms', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Tabular Forms</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
