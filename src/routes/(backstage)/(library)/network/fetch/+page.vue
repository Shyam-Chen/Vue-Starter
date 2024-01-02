<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XCard, XButton } from '@x/ui';
import { request } from '@x/ui';

const text = ref();

const doFetch = async () => {
  const { _data } = await request<{ message: string }>('/hello-world', { method: 'GET' });
  text.value = _data?.message;
};
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Network' }, { text: 'Fetch' }]" />

  <h1 class="text-4xl font-extrabold my-4">Fetch</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="flex flex-col items-center gap-2">
        <div><XButton @click="doFetch">Fetch</XButton></div>
        <div>{{ text }}</div>
      </div>
    </XCard>
  </section>
</template>
