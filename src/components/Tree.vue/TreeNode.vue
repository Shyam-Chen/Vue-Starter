<script lang="ts" setup>
type Node = {
  label?: string;
  children?: Node[];
  level?: number;
};

defineProps<{
  label?: string;
  children?: Node[];
  level?: number;
}>();
</script>

<template>
  <div
    class="node relative"
    :class="{ 'cursor-pointer': children?.length, 'node-line': level !== 1 }"
  >
    <div v-if="children?.length" class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
    <div v-else class="i-mdi-dot w-6 h-6"></div>
    <div>{{ label }}</div>
  </div>

  <div v-if="children?.length" class="pl-4 relative" :class="{ 'node-line': level !== 1 }">
    <TreeNode
      v-for="node in children"
      :key="node.label"
      :label="node.label"
      :children="node.children"
      :level="node.level"
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
