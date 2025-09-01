<script lang="ts" setup>
import { request, useEventSource, XButton, XTextField } from '@x/ui';
import { onMounted, ref, watch } from 'vue';

const id = Math.floor(Math.random() * 10) + 1;

const eventData = ref<string | null>(null);

onMounted(() => {
  const { data } = useEventSource(`/sse/event/${id}`);

  watch(data, (newData) => {
    eventData.value = newData;
  });
});

const message = ref('Hello, World!');

const trigger = async () => {
  await request<{ message: string }>(`/sse/event/${id}`, {
    method: 'POST',
    body: { message: message.value },
  });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>ID: {{ id }}</div>

    <div class="flex gap-4">
      <XButton @click="trigger">Trigger</XButton>
      <XTextField v-model:value="message" />
    </div>

    <pre v-if="eventData">{{ JSON.parse(eventData) }}</pre>
  </div>
</template>
