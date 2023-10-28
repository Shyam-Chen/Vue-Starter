<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';

import Basic from './Basic.vue';
</script>

<template>
  <Breadcrumbs
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
