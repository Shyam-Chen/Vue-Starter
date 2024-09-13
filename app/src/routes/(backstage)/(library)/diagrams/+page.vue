<script lang="ts" setup>
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import type { Node, Edge } from '@vue-flow/core';
import { ref } from 'vue';
import { XBreadcrumb, XCard } from '@x/ui';
import { VueFlow as Diagram } from '@vue-flow/core';

const nodes = ref<Node[]>([
  {
    id: '1',
    position: { x: 10, y: 10 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    position: { x: 60, y: 110 },
    data: { label: 'Node 2' },
  },
]);

const edges = ref<Edge[]>([
  {
    id: '1->2',
    source: '1',
    target: '2',
  },
]);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Diagrams' }]" />

  <h1 class="text-4xl font-extrabold my-4">Diagrams</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="w-full h-100">
        <Diagram :nodes :edges />
      </div>
    </XCard>
  </section>
</template>
