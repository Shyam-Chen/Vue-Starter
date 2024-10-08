<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XSelect } from '@x/ui';

import WithinPopover from './WithinPopover.vue';
import WithinTableCell from './WithinTableCell.vue';
import WithinTableCellWithinDialog from './WithinTableCellWithinDialog.vue';

const flux = reactive({
  select1: '',
  select1Options: [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Vue', value: 'vue' },
    { label: 'Nest', value: 'nest' },
    { label: 'Express', value: 'express' },
    { label: 'Fastify', value: 'fastify' },
    { label: 'Koa', value: 'koa' },
    { label: 'Analog', value: 'analog' },
    { label: 'Next', value: 'next' },
    { label: 'SvelteKit', value: 'svelte-kit' },
    { label: 'Nuxt', value: 'nuxt' },
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
      <XSelect v-model:value="flux.select1" label="Example label" :options="flux.select1Options" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <XSelect
        v-model:value="flux.select1"
        label="Example label"
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
    <h2 class="text-3xl font-bold my-4 pt-6">Within Popover</h2>

    <XCard>
      <WithinPopover />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Within TableCell</h2>

    <XCard>
      <WithinTableCell />
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Within TableCell within Dialog</h3>

      <XCard>
        <WithinTableCellWithinDialog />
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Group (TODO)</h2>

    <XCard>
      <!--  -->
    </XCard>
  </section>
</template>
