<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Gantt' }]" />

  <h1 class="text-4xl font-extrabold my-4">Gantt (TODO)</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard> </XCard>
  </section>
</template>
