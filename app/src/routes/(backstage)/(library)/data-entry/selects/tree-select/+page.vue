<script lang="ts" setup>
import { XBreadcrumb, XCard, XTreeSelect } from '@x/ui';
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Selects' },
      { text: 'TreeSelect' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">TreeSelect</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic (WIP)</h2>

    <XCard>
      <XTreeSelect />
    </XCard>
  </section>
</template>
