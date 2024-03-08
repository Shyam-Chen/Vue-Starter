<script lang="ts" setup>
import { XBreadcrumb } from '@lyra/ui';

import Basic from './Basic.vue';
import Touched from './Touched.vue';
</script>

<template>
  <XBreadcrumb
    :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Form Validation' }]"
  />

  <h1 class="text-4xl font-extrabold my-4">Form Validation</h1>

  <Basic />
  <Touched />
</template>
