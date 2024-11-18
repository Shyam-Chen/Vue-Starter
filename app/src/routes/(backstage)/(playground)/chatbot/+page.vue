<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { XBreadcrumb, stream } from '@x/ui';

import MarkdownRenderer from './MarkdownRenderer.vue';

const eventData = ref('');

onMounted(async () => {
  // const events = await stream('/sse/model', {
  //   method: 'POST',
  //   body: JSON.stringify({ message: 'What is Vue?' }),
  // });

  // for await (const event of events) {
  //   eventData.value += JSON.parse(event.data as string)?.kwargs?.content;
  // }

  // -

  const events = await stream('/sse/model/query');

  for await (const event of events) {
    eventData.value += JSON.parse(event.data as string)?.answer || '';
  }
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Playground' }, { text: 'Chatbot' }]" />

  <h1 class="text-4xl font-extrabold my-4">Chatbot</h1>

  <MarkdownRenderer v-if="eventData" :content="eventData" />
  <div v-else>Loading...</div>
</template>
