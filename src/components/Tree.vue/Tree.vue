<script lang="ts" setup>
import { ref, watch, provide } from 'vue';

import TreeNode from './TreeNode.vue';

type Node = {
  label?: string;
  children?: Node[];
};

const props = defineProps<{
  nodes?: Node[];
}>();

const createTree = (
  arr: Node[] = [],
  level = 1,
  status = false,
): Array<Node & { level?: number; status?: boolean }> => {
  return [...arr].map((item) => {
    if (item.children) {
      return { ...item, level, status, children: createTree(item.children, level + 1) };
    }

    return { ...item, level, status };
  });
};

const nodesRef = ref<Array<Node & { level?: number; status?: boolean }>>([]);

watch(
  () => props.nodes,
  (val) => {
    nodesRef.value = createTree(val);
  },
  { deep: true, immediate: true },
);

provide('Tree', {
  nodesRef,
});
</script>

<template>
  <div v-for="node in nodesRef" :key="node.label">
    <TreeNode
      :label="node.label"
      :children="node.children"
      :level="node.level"
      :status="node.status"
    />
  </div>
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
