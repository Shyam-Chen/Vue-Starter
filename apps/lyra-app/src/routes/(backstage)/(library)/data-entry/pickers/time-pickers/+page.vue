<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XCard, XTimePicker } from '@lyra/ui';

const time = ref('');
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Pickers' },
      { text: 'TimePicker' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">TimePicker</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XTimePicker v-model:value="time" />
      <div class="mt-1">{{ time }}</div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Clearable</h2>

    <XCard>
      <XTimePicker v-model:value="time" clearable />
      <div class="mt-1">{{ time }}</div>
    </XCard>
  </section>
</template>
