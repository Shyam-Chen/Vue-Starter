<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XCard, XMonthPicker } from '@x/ui';

const month = ref('');
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Pickers' },
      { text: 'MonthPicker' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">MonthPicker</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XMonthPicker v-model:value="month" />
      <div class="mt-1">{{ month }}</div>
    </XCard>
  </section>
</template>
