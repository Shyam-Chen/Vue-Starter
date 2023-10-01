<script lang="ts" setup>
import { ref } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue/Button.vue';

type TreeTableNode = {
  key?: string;
  name?: string;
  size?: string;
  type?: string;
  level?: number;
  status?: boolean;
  children?: TreeTableNode[];
};

const initial = ref<TreeTableNode[]>([
  {
    key: '1',
    name: 'Applications',
    size: '100kb',
    type: 'Folder',
    level: 1,
    children: [
      {
        key: '1-1',
        name: 'Vue',
        size: '25kb',
        type: 'Folder',
        level: 2,
        children: [
          { key: '1-1-1', name: 'vue.app', size: '10kb', type: 'Application', level: 3 },
          { key: '1-1-3', name: 'native.app', size: '10kb', type: 'Application', level: 3 },
        ],
      },
      { key: '1-2', name: 'Svelte', size: '25kb', type: 'Folder', level: 2 },
    ],
  },
  {
    key: '2',
    name: 'Cloud',
    size: '500kb',
    type: 'Folder',
    level: 1,
    children: [
      { key: '2-1', name: 'AWS', size: '25kb', type: 'Folder', level: 2 },
      { key: '2-2', name: 'Azure', size: '25kb', type: 'Folder', level: 2 },
      { key: '2-3', name: 'GCP', size: '25kb', type: 'Folder', level: 2 },
    ],
  },
  {
    key: '3',
    name: 'Desktop',
    size: '750kb',
    type: 'Folder',
    level: 1,
  },
]);

const treeTableNodes = ref([...initial.value]);

function treeNode(item: TreeTableNode) {
  item.status = !item.status;

  if (item.status) {
    const arr = [...treeTableNodes.value];
    const index = treeTableNodes.value.findIndex((node) => item.key === node.key);
    arr.splice(index + 1, 0, ...(item?.children || []));
    treeTableNodes.value = arr;
  } else {
    const arr = [...treeTableNodes.value];
    const index = treeTableNodes.value.findIndex((node) => item.key === node.key);
    arr.splice(index + 1, item?.children?.length);
    treeTableNodes.value = arr;
  }
}
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
          <th
            class="px-6 bg-blueGray-200 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200 align-middle border border-solid border-blueGray-100 dark:border-blueGray-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          >
            Name
          </th>
          <th
            class="px-6 bg-blueGray-200 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200 align-middle border border-solid border-blueGray-100 dark:border-blueGray-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          >
            Size
          </th>
          <th
            class="px-6 bg-blueGray-200 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200 align-middle border border-solid border-blueGray-100 dark:border-blueGray-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          >
            Type
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="node in treeTableNodes"
          :key="node.name"
          class="hover:bg-slate-100 dark:hover:bg-slate-600 border-b last:border-b-0 dark:border-slate-600"
        >
          <td class="px-6 py-3 align-middle whitespace-nowrap">
            <div
              class="flex items-center"
              :style="{ 'padding-left': Number(node.level) > 1 ? `${node.level}rem` : '0' }"
            >
              <Button
                v-if="node.children?.length"
                icon="i-fa-caret-down"
                color="secondary"
                variant="text"
                @click="treeNode(node)"
              />
              <div v-else class="w-38px h-38px"></div>
              <div class="ml-2">{{ node.name }} - {{ node.level }}</div>
            </div>
          </td>
          <td class="px-6 py-3 align-middle whitespace-nowrap">{{ node.size }}</td>
          <td class="px-6 py-3 align-middle whitespace-nowrap">{{ node.type }}</td>
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
