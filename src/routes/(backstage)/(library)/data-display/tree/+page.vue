<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Tree from '~/components/Tree.vue';
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tree' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Tree</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Tree
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
              children: [{ label: '1-3-1' }, { label: '1-3-2' }, { label: '1-3-3' }],
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
      ]"
    />
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Lazy</div>
  </div>
</template>
