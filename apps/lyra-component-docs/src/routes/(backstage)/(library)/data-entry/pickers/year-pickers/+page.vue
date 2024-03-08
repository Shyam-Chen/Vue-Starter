<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XCard, XYearPicker } from '@lyra/ui';

const year = ref<number>();
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Pickers' },
      { text: 'Year Pickers' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">YearPicker</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XYearPicker v-model:value="year" />
      <div class="mt-1">{{ year }}</div>
    </XCard>
  </section>
</template>
