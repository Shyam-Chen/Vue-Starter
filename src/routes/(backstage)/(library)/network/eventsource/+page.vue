<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';
import { useEventSource } from '@x/ui';

const { data } = useEventSource('/sse');
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Network' }, { text: 'EventSource' }]" />

  <h1 class="text-4xl font-extrabold my-4">EventSource</h1>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <div>{{ data }}</div>
    </div>
  </div>
</template>
