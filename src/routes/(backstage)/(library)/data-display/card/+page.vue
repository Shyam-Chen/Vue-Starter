<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Card' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Card</div>
  </div>

  <XCard />
</template>
