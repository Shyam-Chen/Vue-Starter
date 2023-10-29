<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';

import Basic from './Basic.vue';
import Selectable from './Selectable.vue';
</script>

<template>
  <Breadcrumbs
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
</template>
