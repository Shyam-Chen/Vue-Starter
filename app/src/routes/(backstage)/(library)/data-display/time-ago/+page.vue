<script lang="ts" setup>
import { XBreadcrumb, XCard, XCodeBlock } from '@x/ui';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Time Ago' }]" />

  <h1 class="text-4xl font-extrabold my-4">Time Ago (TODO)</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <Basic />
    </XCard>

    <XCodeBlock :code="BasicCode" language="vue" class="max-h-100" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">...</h2>

    <XCard>
      <div>...</div>
    </XCard>
  </section>
</template>
