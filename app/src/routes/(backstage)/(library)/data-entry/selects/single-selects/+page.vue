<script lang="ts" setup>
import { XBreadcrumb, XCard, XCodeBlock } from '@x/ui';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';
import Statuses from './Statuses.vue';
import StatusesCode from './Statuses.vue?raw';
import WithinPopover from './WithinPopover.vue';
import WithinTableCell from './WithinTableCell.vue';
import WithinTableCellWithinDialog from './WithinTableCellWithinDialog.vue';
import Group from './Group.vue';
import VirtualScroll from './VirtualScroll.vue';
</script>

<template>
  <XBreadcrumb
    :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Selects' }, { text: 'Select' }]"
  />

  <h1 class="text-4xl font-extrabold my-4">Select</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <Basic />
    </XCard>

    <XCodeBlock :code="BasicCode" language="vue" class="max-h-100" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Statuses</h2>

    <XCard>
      <Statuses />
    </XCard>

    <XCodeBlock :code="StatusesCode" language="vue" class="max-h-100" />
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
      <Group />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Virtual Scroll (TODO)</h2>

    <XCard>
      <VirtualScroll />
    </XCard>
  </section>
</template>
