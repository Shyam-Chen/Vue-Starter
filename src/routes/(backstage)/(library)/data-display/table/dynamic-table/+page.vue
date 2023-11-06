<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';

import Basic from './Basic.vue';
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Display' },
      { text: 'Table' },
      { text: 'Dynamic Table' },
    ]"
  />

  <div class="text-4xl font-extrabold">Dynamic Table</div>

  <Basic />
  <!-- <Selectable /> -->
</template>
