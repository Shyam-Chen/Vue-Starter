<script lang="ts" setup>
import { useWebSocket, XBreadcrumb, XCard } from '@x/ui';

const { data, send } = useWebSocket('/echo');

send('Hello from Vue!');
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Network' }, { text: 'WebSocket' }]" />

  <h1 class="text-4xl font-extrabold my-4">WebSocket</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="flex justify-center">
        <div>{{ data }}</div>
      </div>
    </XCard>
  </section>
</template>
