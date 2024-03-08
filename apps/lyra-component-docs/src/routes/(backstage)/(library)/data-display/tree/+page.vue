<script lang="ts" setup>
import { XBreadcrumb, XCard, XTree } from '@lyra/ui';

type NodeSelect = InstanceType<typeof XTree>['onNodeSelect'];

const nodeSelect: NodeSelect = (node) => {
  console.log(node);
};
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tree' }]" />

  <h1 class="text-4xl font-extrabold my-4">Tree</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XTree
        :nodes="[
          {
            label: '1',
            children: [
              {
                label: '1-1',
                children: [{ label: '1-1-1' }, { label: '1-1-2' }],
              },
              {
                label: '1-2',
                children: [{ label: '1-2-1' }, { label: '1-2-2' }],
              },
              {
                label: '1-3',
                children: [
                  { label: '1-3-1' },
                  { label: '1-3-2', children: [{ label: '1-3-2-1' }, { label: '1-3-2-2' }] },
                  { label: '1-3-3' },
                ],
              },
            ],
          },
          {
            label: '2',
            children: [
              {
                label: '2-1',
                children: [
                  { label: '2-1-1', children: [{ label: '2-1-1-1' }, { label: '2-1-1-2' }] },
                  { label: '2-1-2' },
                ],
              },
              { label: '2-2' },
            ],
          },
          { label: '3' },
        ]"
        @nodeSelect="nodeSelect"
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Lazy</h2>

    <XCard>
      <div>TODO</div>
    </XCard>
  </section>
</template>
