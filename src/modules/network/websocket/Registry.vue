<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import { useWebSocket } from '~/composables';

const { data, send } = useWebSocket('/echo');

send('Hello from Vue!');
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Network', disabled: true },
      { text: 'WebSocket', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">WebSocket</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <div>{{ data }}</div>
    </div>
  </div>
</template>
