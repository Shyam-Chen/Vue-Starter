<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const msgs = { required: 'This is a required field' };

const state = reactive({
  tabularForm: {
    table: [
      { firstField: 'O', secondField: '' },
      { firstField: '', secondField: 'O' },
      { firstField: 'O', secondField: 'O' },
      { firstField: '', secondField: '' },
    ],
  },
  tabularValdn: {} as Record<string, string>,
});

const schema = useZodSchema(
  z.object({
    table: z.array(
      z.object({
        firstField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
        secondField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
      }),
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn'),
);

schema.validate();
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tabular Forms' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Tabular Forms</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic (Tabs or Tables)</div>

    <pre>{{ state.tabularForm }}</pre>
    <pre>{{ state.tabularValdn }}</pre>
  </div>
</template>
