<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { XBreadcrumb, XCard, XButton, XTextField } from '@x/ui';
import { useEventSource } from '@x/ui';
import { request } from '@x/ui';
import { stream } from 'fetch-event-stream';

const { data } = useEventSource('/sse');
const { data: dataEvent } = useEventSource('/sse/event');

const message = ref('Test');

const doFetch = async () => {
  await request<{ message: string }>('/sse/event', {
    method: 'POST',
    body: { message: message.value },
  });
};

const eventData = ref<string>();

onMounted(async () => {
  const events = await stream('/api/sse');

  for await (let event of events) {
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
    <h2 class="text-3xl font-bold my-4">Trigger Events</h2>

    <XCard>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <XButton @click="doFetch">Trigger</XButton>
          <XTextField v-model:value="message" />
        </div>
        <pre v-if="dataEvent">{{ JSON.parse(dataEvent) }}</pre>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Fetch</h2>

    <XCard>
      <div class="flex justify-center">
        <div>{{ eventData }}</div>
      </div>
    </XCard>
  </section>
</template>
