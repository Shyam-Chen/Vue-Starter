<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';

import provider from './provider';
import Consumer from './Consumer.vue';

provider();
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Forms', disabled: true },
      { text: 'Form validation', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Form validation</div>
  </div>

  <Consumer />
</template>
