<script lang="ts" setup>
import { ref, watch, provide } from 'vue';

import type { Node } from './types';
import TreeNode from './TreeNode.vue';

const defaultModel = defineModel<Node['value'] | Node['value'][]>({
  get(val) {
    if (props.multiple) return val || [];
    return val;
  },
});

const props = defineProps<{
  nodes?: Node[];
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'select', val: Node): void;
}>();

const createTree = (arr: Node[] = [], level = 1): Node[] => {
  return [...arr].map((item) => {
    const selected = props.multiple
      ? (defaultModel.value as Node['value'][]).includes(item.value)
      : undefined;

    if (item.children?.length) {
      return { ...item, level, children: createTree(item.children, level + 1), checked: selected };
    }

    return { ...item, level, checked: selected };
  });
};

const nodesRef = ref<Node[]>([]);

watch(
  () => props.nodes,
  (val) => {
    nodesRef.value = createTree(val);
  },
  { deep: true, immediate: true },
);

function onSelect(val: Node) {
  if (!props.multiple) defaultModel.value = val.value;
  emit('select', val);
}

const onCheckAll = (nodes: Node[], checked: boolean) => {
  for (const node of nodes) {
    node.checked = checked;

    if (node.children?.length) {
      onCheckAll(node.children, checked);
    }
  }
};

function onChecked(node?: Node) {
  if (!node) return;
  node.checked = !node.checked;

  if (node.children?.length) {
    onCheckAll(node.children, node.checked);
  }
}

function areAllChecked(nodes: Node[]): boolean {
  return nodes.every((node) => {
    if (!node.checked) return false;
    if (node.children?.length) return areAllChecked(node.children);
    return true;
  });
}

function areAllUnchecked(nodes: Node[]): boolean {
  return nodes.every((node) => {
    if (node.checked) return false;
    if (node.children?.length) return areAllUnchecked(node.children);
    return true;
  });
}

function setIndeterminate(node: Node) {
  if (node.children?.length) {
    const checked = areAllChecked(node.children);
    const unchecked = areAllUnchecked(node.children);

    node.indeterminate = !(checked || unchecked);

    if (checked) node.checked = true;
    if (unchecked) node.checked = false;

    for (const childNode of node.children) {
      if (childNode.children?.length) setIndeterminate(childNode);
    }
  }
}

function getCheckedValues(values: Node['value'][], nodes: Node[]) {
  for (const node of nodes) {
    if (node.checked || node.indeterminate) {
      values.push(node.value);
    }

    if (node.children?.length) {
      getCheckedValues(values, node.children);
    }
  }
}

watch(
  nodesRef,
  (val) => {
    if (!props.multiple) return;

    for (const node of val) {
      setIndeterminate(node);
    }

    let values = [] as Node['value'][];
    getCheckedValues(values, nodesRef.value);
    defaultModel.value = values;
  },
  { deep: true, immediate: true },
);

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
  onChecked,
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
