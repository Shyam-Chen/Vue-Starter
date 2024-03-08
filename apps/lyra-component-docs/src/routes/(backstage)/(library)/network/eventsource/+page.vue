<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@lyra/ui';
import { useEventSource } from '@lyra/ui';

const { data } = useEventSource('/sse');
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Network' }, { text: 'EventSource' }]" />

  <h1 class="text-4xl font-extrabold my-4">EventSource</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="flex justify-center">
        <div>{{ data }}</div>
      </div>
    </XCard>
  </section>
</template>
