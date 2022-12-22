<script lang="ts" setup>
// import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Alert from '~/components/Alert.vue';

// const flux = reactive({

// });
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Feedback', disabled: true },
      { text: 'Alert', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Alert</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Alert />
  </div>
</template>
