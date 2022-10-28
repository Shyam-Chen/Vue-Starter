<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Iterator from '~/components/Iterator.vue';
import TextField from '~/components/TextField.vue';

const flux = reactive({
  iterator1: [{}],
  iterator2: [{}],
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Tables', disabled: true },
      { text: 'Data iterators', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Data iterators</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <Iterator v-model:value="flux.iterator1">
        <template #default="{ item }">
          <TextField v-model:value="item.address" />
        </template>
      </Iterator>
    </div>

    <pre>{{ flux.iterator1 }}</pre>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <Iterator v-model:value="flux.iterator2">
        <template #default="{ item }">
          <div class="whitespace-nowrap">Deploy a</div>
          <TextField v-model:value="item.serviceName" :errorMessage="'Error Message'" />
          <div class="whitespace-nowrap">service to</div>
          <TextField v-model:value="item.cloudName" />
        </template>
      </Iterator>
    </div>

    <pre>{{ flux.iterator2 }}</pre>
  </div>
</template>
