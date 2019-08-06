<template>
  <ul>
    <TreeNode :node="tree" />
  </ul>
</template>

<script>
import TreeNode from './TreeNode';

export default {
  components: {
    TreeNode,
  },
  props: {
    tree: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
