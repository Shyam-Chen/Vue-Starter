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

  <div class="text-4xl font-extrabold">Static Table</div>

  <Basic />
  <Selectable />
</template>
