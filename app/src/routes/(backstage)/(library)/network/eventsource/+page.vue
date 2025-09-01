<script lang="ts" setup>
import { stream, useEventSource, XBreadcrumb, XCard } from '@x/ui';
import { onMounted, ref } from 'vue';

import TriggerEventById from './TriggerEventById.vue';

const { data } = useEventSource('/sse');

// -

const eventData = ref<string>();

onMounted(async () => {
  const events = await stream('/sse');

  for await (const event of events) {
    eventData.value = event.data;
  }
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Network' }, { text: 'EventSource' }]" />

  <h1 class="text-4xl font-extrabold my-4">EventSource</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="flex justify-center">
        <div>{{ data }}</div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Fetch</h2>

    <XCard>
      <div class="flex justify-center">
        <div>{{ eventData }}</div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Trigger Event by ID</h2>

    <XCard>
      <TriggerEventById />
    </XCard>
  </section>
</template>
