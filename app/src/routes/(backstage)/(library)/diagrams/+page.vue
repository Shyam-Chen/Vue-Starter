<script lang="ts" setup>
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import type { Edge, Node } from '@vue-flow/core';
import { VueFlow as Diagram } from '@vue-flow/core';
import { XBreadcrumb } from '@x/ui';
import { ref } from 'vue';

import BlankCard from './BlankCard.vue';
import Controls from './Controls.vue';

const nodes = ref<Node[]>([
  {
    id: '1',
    type: BlankCard.name,
    position: { x: 10, y: 10 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    type: BlankCard.name,
    position: { x: 60, y: 160 },
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
    <div class="w-full h-100">
      <Diagram :nodes :edges>
        <template #[`node-${BlankCard.name}`]="{ data, selected }">
          <BlankCard :data :selected />
        </template>

        <Controls />
      </Diagram>
    </div>
  </section>
</template>
