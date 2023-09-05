<script lang="ts" setup>
import type { WritableComputedRef } from 'vue';
import { inject } from 'vue';

import Collapse from '../Collapse.vue';

type Node = {
  label?: string;
  children?: Node[];
  level?: number;
  status?: boolean;
};

defineProps<{
  label?: string;
  children?: Node[];
  level?: number;
  status?: boolean;
}>();

const tree = inject('Tree') as { nodesRef: WritableComputedRef<Node[]> };

function changeStatus(label: Node['label'], level: Node['level']) {
  for (const item of tree.nodesRef.value) {
    if (item.label === label && item.level === level) {
      item.status = !item.status;
      break;
    } else if (item.children) {
      changeChildStatus(item.children, label, level);
    }
  }
}

function changeChildStatus(children: Node['children'], label: Node['label'], level: Node['level']) {
  for (const item of children || []) {
    if (item.label === label && item.level === level) {
      item.status = !item.status;
      break;
    } else if (item.children) {
      changeChildStatus(item.children, label, level);
    }
  }
}
</script>

<template>
  <div
    class="node relative"
    :class="{ 'cursor-pointer': children?.length, 'node-line': level !== 1 }"
    @click="changeStatus(label, level)"
  >
    <div v-if="children?.length" class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
    <div v-else class="i-mdi-dot w-6 h-6"></div>
    <div>{{ label }}</div>
  </div>

  <Collapse>
    <div
      v-if="children?.length && status"
      class="pl-4 relative"
      :class="{ 'node-line': level !== 1 }"
    >
      <TreeNode
        v-for="node in children"
        :key="node.label"
        :label="node.label"
        :children="node.children"
        :level="node.level"
        :status="node.status"
      />
    </div>
  </Collapse>
</template>

<style lang="scss" scoped>
.node {
  @apply flex;
  @apply p-1 rounded-md;
  @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600;
}

.node-line {
  &::after {
    @apply content-[''] absolute left-0 top-0 flex h-full;
    @apply border-l border-slate-300 dark:border-slate-600;
  }
}
</style>
