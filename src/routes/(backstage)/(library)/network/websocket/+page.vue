<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';
import { useWebSocket } from '~/composables';

const { data, send } = useWebSocket('/echo');

send('Hello from Vue!');
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Network' }, { text: 'WebSocket' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">WebSocket</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <div>{{ data }}</div>
    </div>
  </div>
</template>
