<script lang="ts" setup>
import { XBreadcrumb, XSpinner, XProgressBar } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Progress' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Progress</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center gap-4">
      <XSpinner class="w-4 h-4" />
      <XSpinner />
      <XSpinner class="w-12 h-12" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center gap-4">
      <XProgressBar />
    </div>
  </div>
</template>
