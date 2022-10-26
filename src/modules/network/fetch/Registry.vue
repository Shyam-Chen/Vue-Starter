<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';
import { useFetch } from '~/composables';

const helloWorldApi = useFetch('/hello-world').json();
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Network', disabled: true },
      { text: 'Fetch', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Fetch</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <div>{{ helloWorldApi.data.value?.hello }}</div>
      <Button color="primary" @click="helloWorldApi.get().execute">Fetch</Button>
    </div>
  </div>
</template>
