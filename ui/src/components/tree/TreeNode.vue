<script lang="ts" setup>
import type { ModelRef } from 'vue';
import { computed, inject } from 'vue';

import Checkbox from '../checkbox/Checkbox.vue';
import Collapse from '../collapse/Collapse.vue';

import type { Node } from './types';

const props = defineProps<{
  node?: Node;
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'select', val: Node): void;
}>();

function nodeSelect(node?: Node, toggle?: boolean, select?: boolean) {
  if (node) {
    if (toggle) node.status = !node.status;
    if (select) emit('select', node);
  }
}

const lineLeftValue = 0.74;

const lineLeftBind = computed(() => {
  if (typeof props.node?.level === 'number' && props.node.level > 2) {
    return `${lineLeftValue + props.node.level - 2}rem`;
  }

  return `${lineLeftValue}rem`;
});

const tree = inject('Tree') as {
  defaultModel?: ModelRef<Node['value'] | Node['value'][]>;
  onChecked: (node?: Node) => void;
};
</script>

<template>
  <div
    class="TreeNode-Element"
    :class="{
      'cursor-pointer': node?.children?.length,
      'TreeNode-Line': node?.level !== 1,
      active: tree.defaultModel?.value === node?.value,
    }"
    :style="[typeof node?.level === 'number' && `padding-left: ${node.level - 1}rem`]"
    @click.stop="
      multiple && tree.onChecked(node);
      nodeSelect(node, !multiple, true);
    "
  >
    <div
      v-if="Array.isArray(node?.children)"
      class="size-6"
      :class="{
        'i-material-symbols-arrow-drop-down-rounded': node.status,
        'i-material-symbols-arrow-right-rounded': !node.status,
      }"
      @click.stop="nodeSelect(node, true, false)"
    ></div>
    <div v-else class="i-mdi-dot size-6"></div>
    <Checkbox
      v-if="multiple"
      :checked="node?.checked"
      :indeterminate="node?.indeterminate"
      @change.stop="
        tree.onChecked(node);
        nodeSelect(node, !multiple, true);
      "
    />
    <div class="mx-2">{{ node?.label }}</div>
  </div>

  <Collapse>
    <div
      v-if="node?.children?.length && node?.status"
      class="relative"
      :class="{ 'TreeNode-Line': node?.level !== 1 }"
    >
      <TreeNode
        v-for="childNode in node.children"
        :key="String(childNode.value)"
        :node="childNode"
        :multiple
        @select="(val) => emit('select', val)"
      />
    </div>
  </Collapse>
</template>

<style lang="scss" scoped>
.TreeNode-Element {
  @apply flex items-center relative p-1 rounded-md border border-transparent;
  @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600;

  &.active {
    @apply ring-1 ring-primary-500/40 !border-primary-400;
  }

  :deep(.Checkbox-Label) {
    @apply !min-h-auto;
  }
}

.TreeNode-Line {
  &::before {
    @apply content-[''] absolute top-0 flex h-full;
    @apply border-l-2 border-slate-200/50 dark:border-slate-600/50;

    left: v-bind(lineLeftBind);
  }
}
</style>
