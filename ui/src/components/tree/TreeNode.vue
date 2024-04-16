<script lang="ts" setup>
import Checkbox from '../checkbox/Checkbox.vue';
import Collapse from '../collapse/Collapse.vue';

import type { Node } from './types';

defineProps<{
  node?: Node;
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'select', val: Node): void;
}>();

function nodeSelect(node?: Node) {
  if (node) {
    node.status = !node.status;
    emit('select', node);
  }
}
</script>

<template>
  <div
    class="TreeNode-Element"
    :class="{ 'cursor-pointer': node?.children?.length, 'TreeNode-Line': node?.level !== 1 }"
    @click.stop="nodeSelect(node)"
  >
    <div
      v-if="Array.isArray(node?.children)"
      class="size-6"
      :class="{
        'i-material-symbols-arrow-drop-down-rounded': node.status,
        'i-material-symbols-arrow-right-rounded': !node.status,
      }"
    ></div>
    <div v-else class="i-mdi-dot size-6"></div>
    <Checkbox v-if="multiple" class="me-2" />
    <div>{{ node?.label }}</div>
  </div>

  <Collapse>
    <div
      v-if="node?.children?.length && node?.status"
      class="pl-4 relative"
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
  @apply flex items-center relative p-1 rounded-md;
  @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600;
}

.TreeNode-Line {
  &::after {
    @apply content-[''] absolute left-0 top-0 flex h-full;
    @apply border-l border-slate-300 dark:border-slate-600;
  }
}
</style>
