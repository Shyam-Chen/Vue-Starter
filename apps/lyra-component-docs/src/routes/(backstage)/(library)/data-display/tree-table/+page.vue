<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XTable, XButton } from '@lyra/ui';

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
      {
        key: '2-3',
        name: 'GCP',
        size: '25kb',
        type: 'Folder',
        level: 2,
        children: [
          { key: '2-3-1', name: 'Cloud Run', size: '10kb', type: 'Folder', level: 3 },
          { key: '2-3-2', name: 'Artifact Registry', size: '50kb', type: 'Folder', level: 3 },
        ],
      },
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

function getChildrenCountByKey(data: TreeTableNode[], targetKey: TreeTableNode['key']) {
  const targetObject = data.find((item) => item.key === targetKey);

  if (!targetObject) {
    return 0;
  }

  let count = targetObject.children?.length || 0;

  targetObject.children?.forEach((child) => {
    if (child.status) {
      child.status = false;
      count += getChildrenCountByKey(data, child.key);
    }
  });

  return count;
}

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
    const count = getChildrenCountByKey(arr, item.key);
    arr.splice(index + 1, count);
    treeTableNodes.value = arr;
  }
}
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'TreeTable' }]" />

  <h1 class="text-4xl font-extrabold my-4">TreeTable</h1>

  <div class="TreeTable-Wrapper">
    <table class="TreeTable-Element">
      <thead>
        <tr>
          <XTable.Column>
            <div class="inline-flex items-center min-h-38px">Name</div>
          </XTable.Column>
          <XTable.Column>
            <div class="inline-flex items-center min-h-38px">Size</div>
          </XTable.Column>
          <XTable.Column>
            <div class="inline-flex items-center min-h-38px">Type</div>
          </XTable.Column>
        </tr>
      </thead>

      <tbody>
        <XTable.Row v-for="node in treeTableNodes" :key="node.name">
          <XTable.Cell>
            <div
              class="flex items-center"
              :style="{ 'padding-left': Number(node.level) > 1 ? `${node.level}rem` : '0' }"
            >
              <XButton
                v-if="node.children?.length"
                :icon="
                  node.status
                    ? 'i-material-symbols-arrow-drop-up-rounded !w-6 !h-6'
                    : 'i-material-symbols-arrow-drop-down-rounded !w-6 !h-6'
                "
                color="secondary"
                variant="text"
                @click="treeNode(node)"
              />
              <div v-else class="w-38px h-38px"></div>
              <div class="ml-2">{{ node.name }} - {{ node.level }}</div>
            </div>
          </XTable.Cell>
          <XTable.Cell>{{ node.size }}</XTable.Cell>
          <XTable.Cell>{{ node.type }}</XTable.Cell>
        </XTable.Row>
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
