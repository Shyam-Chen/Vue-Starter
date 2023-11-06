<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';
import { useEventSource } from '~/composables';

const { data } = useEventSource('/sse');
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Network' }, { text: 'EventSource' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">EventSource</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <div>{{ data }}</div>
    </div>
  </div>
</template>
