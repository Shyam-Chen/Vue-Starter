<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const msgs = { required: 'This is a required field' };

const state = reactive({
  tabularForm: {
    groups: [
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
  },
  tabularValdn: {} as Record<string, string>,
});

const schema = useZodSchema(
  z.object({
    groups: z.array(
      z.object({
        parent: z.string({ required_error: msgs.required }).nonempty(msgs.required),
        children: z.array(
          z.object({
            firstField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
            secondField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
          }),
        ),
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
    :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tabular Form Groups' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Tabular Form Groups</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic (Tabs + Tables)</div>

    <pre>{{ state.tabularForm }}</pre>
    <pre>{{ state.tabularValdn }}</pre>
  </div>
</template>
