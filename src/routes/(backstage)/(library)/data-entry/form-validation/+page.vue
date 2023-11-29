<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';

import Basic from './Basic.vue';
</script>

<template>
  <XBreadcrumb
    :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Form Validation' }]"
  />

  <div class="my-4">
    <div class="text-4xl font-extrabold">Form Validation</div>
  </div>

  <Basic />
</template>
