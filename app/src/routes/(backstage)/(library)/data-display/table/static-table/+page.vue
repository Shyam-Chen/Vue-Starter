<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';

import Basic from './Basic.vue';
import NoData from './NoData.vue';
import Selectable from './Selectable.vue';
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Display' },
      { text: 'Table' },
      { text: 'Static Table' },
    ]"
  />

  <div class="text-4xl font-extrabold my-4">Static Table</div>

  <Basic class="my-8" />
  <Selectable class="my-8" />
  <NoData class="my-8" />
</template>
