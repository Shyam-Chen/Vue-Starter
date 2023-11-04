<script lang="ts" setup>
import { ref, watch, provide } from 'vue';

import type { Node } from './types';
import TreeNode from './TreeNode.vue';

const props = defineProps<{
  nodes?: Node[];
}>();

const emit = defineEmits<{
  (evt: 'nodeSelect', val: Node): void;
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
  nodeSelect: (val: Node) => emit('nodeSelect', val),
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
