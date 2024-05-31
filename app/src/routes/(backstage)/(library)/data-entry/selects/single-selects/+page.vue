<script lang="ts" setup>
import { XBreadcrumb, XCard, XSelect } from '@x/ui';
import { reactive } from 'vue';

import WithTable from './WithTable.vue';
import WithTableInDialog from './WithTableInDialog.vue';
import WithinPopover from './WithinPopover.vue';

const flux = reactive({
  select1: '',
  select1Options: [
    { label: 'Angular', value: 'f1' },
    { label: 'React', value: 'f2' },
    { label: 'Svelte', value: 'f3' },
    { label: 'Vue', value: 'f4' },
    { label: 'Nest', value: 'b1' },
    { label: 'Express', value: 'b2' },
    { label: 'Fastify', value: 'b3' },
    { label: 'Koa', value: 'b4' },
  ],
});
</script>

<template>
  <XBreadcrumb
    :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Selects' }, { text: 'Select' }]"
  />

  <h1 class="text-4xl font-extrabold my-4">Select</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XSelect
        v-model:value="flux.select1"
        :label="'Example label'"
        :options="flux.select1Options"
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <XSelect
        v-model:value="flux.select1"
        :label="'Example label'"
        :options="flux.select1Options"
        disabled
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Clearable</h2>

    <XCard>
      <XSelect v-model:value="flux.select1" :options="flux.select1Options" clearable />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Filterable</h2>

    <XCard>
      <XSelect v-model:value="flux.select1" :options="flux.select1Options" filterable />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Invalid</h2>

    <XCard>
      <XSelect
        v-model:value="flux.select1"
        :options="flux.select1Options"
        invalid="Incorrect entry"
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Loading</h2>

    <XCard>
      <XSelect v-model:value="flux.select1" :options="flux.select1Options" loading />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">With Table</h2>

    <XCard>
      <WithTable />
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">In Dialog</h3>

      <XCard>
        <WithTableInDialog />
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Within Popover</h2>

    <XCard>
      <WithinPopover />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Option Groups (TODO)</h2>

    <XCard>
      <!--  -->
    </XCard>
  </section>
</template>
