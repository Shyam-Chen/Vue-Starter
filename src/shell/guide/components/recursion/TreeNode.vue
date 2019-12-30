<template>
  <li>
    <span>{{ node.label }}</span>

    <ul v-if="node.children && node.children.length">
      <TreeNode v-for="child in node.children" :key="child.label" :node="child" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
