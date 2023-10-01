<script lang="ts" setup>
import { ref } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue/Button.vue';

const treeTableNodes = ref([
  {
    name: 'Applications',
    size: '100kb',
    type: 'Folder',
    children: [
      {
        name: 'Vue',
        size: '25kb',
        type: 'Folder',
        children: [
          { name: 'vue.app', size: '10kb', type: 'Application' },
          { name: 'native.app', size: '10kb', type: 'Application' },
        ],
      },
      { name: 'Svelte', size: '25kb', type: 'Folder' },
    ],
  },
  {
    name: 'Cloud',
    size: '500kb',
    type: 'Folder',
    children: [
      { name: 'AWS', size: '25kb', type: 'Folder' },
      { name: 'Azure', size: '25kb', type: 'Folder' },
      { name: 'GCP', size: '25kb', type: 'Folder' },
    ],
  },
]);
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'TreeTable' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">TreeTable</div>
  </div>

  <div class="TreeTable-Wrapper">
    <table class="TreeTable-Element">
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Type</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="node in treeTableNodes" :key="node.name">
          <td>
            <div class="flex">
              <Button icon="i-fa-caret-down" color="secondary" variant="text" />
              <div>{{ node.name }}</div>
              <div v-if="node.children?.length">
                <pre>{{ node.children }}</pre>
              </div>
            </div>
          </td>
          <td>{{ node.size }}</td>
          <td>{{ node.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.TreeTable-Wrapper {
  @apply w-full overflow-auto;
}

.TreeTable-Element {
  @apply items-center w-full border-collapse;
}
</style>
