<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';
import { useWebSocket } from '@x/ui';

const { data, send } = useWebSocket('/echo');

send('Hello from Vue!');
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Network' }, { text: 'WebSocket' }]" />

  <h1 class="text-4xl font-extrabold my-4">WebSocket</h1>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <div>{{ data }}</div>
    </div>
  </div>
</template>
