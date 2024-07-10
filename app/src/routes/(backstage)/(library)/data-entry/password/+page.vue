<script lang="ts" setup>
import { XBreadcrumb, XCard, XCodeBlock } from '@x/ui';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';
import Meter from './Meter.vue';
import MeterCode from './Meter.vue?raw';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Password' }]" />

  <h1 class="text-4xl font-extrabold my-4">Password</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <Basic />
    </XCard>

    <XCodeBlock :code="BasicCode" language="vue" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Meter</h2>

    <XCard>
      <Meter />
    </XCard>

    <XCodeBlock :code="MeterCode" language="vue" />
  </section>
</template>
