<script lang="ts" setup>
import { useEventSource } from '@vueuse/core';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const { status, data, error, close } = useEventSource('/api/sse');
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Network', disabled: true },
      { text: 'EventSource', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">EventSource</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <div>{{ data }}</div>
    </div>
  </div>
</template>
