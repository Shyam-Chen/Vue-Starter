<script lang="ts" setup>
import { ref, watch, provide } from 'vue';

import type { Node } from './types';
import TreeNode from './TreeNode.vue';

const defaultModel = defineModel<any>();

const props = defineProps<{
  nodes?: Node[];
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'select', val: Node): void;
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

function onSelect(val: Node) {
  defaultModel.value = val.value;
  emit('select', val);
}

const onToggleAll = (nodes: Node[], status: boolean) => {
  for (const node of nodes) {
    node.status = status;

    if (node.children?.length) {
      onToggleAll(node.children, status);
    }
  }
};

const expandAll = () => {
  onToggleAll(nodesRef.value, true);
};

const collapseAll = () => {
  onToggleAll(nodesRef.value, false);
};

provide('Tree', {
  defaultModel,
});

defineExpose({
  expandAll,
  collapseAll,
});
</script>

<template>
  <div v-for="node in nodesRef" :key="node.label">
    <TreeNode :node :multiple @select="onSelect" />
  </div>
</template>
