<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XButton } from '@x/ui';
import { request } from '@x/ui';

const text = ref();

const doFetch = async () => {
  const { _data } = await request<{ message: string }>('/hello-world', { method: 'GET' });
  text.value = _data?.message;
};
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Network' }, { text: 'Fetch' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Fetch</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex flex-col items-center gap-2">
      <div><XButton @click="doFetch">Fetch</XButton></div>
      <div>{{ text }}</div>
    </div>
  </div>
</template>
