<script lang="ts" setup>
import { XBreadcrumb, XTimeline } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Timeline' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Timeline</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <XTimeline />
  </div>
</template>
