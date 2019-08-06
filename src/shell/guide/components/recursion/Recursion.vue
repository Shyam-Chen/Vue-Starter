<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div class="headline mb-1">Recursion</div>

      <template v-for="tree in trees">
        <Tree :tree="tree" :key="tree.label" />
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import Tree from './Tree';

export default {
  components: {
    Tree,
  },
  data: () => ({
    trees: [
      {
        label: '1',
        children: [
          {
            label: '1-1',
            children: [
              { label: '1-1-1' },
              { label: '1-1-2' },
              {
                label: '1-1-3', children: [{ label: '1-1-3-1' }],
              },
            ],
          },
          { label: '1-2' },
        ],
      },
      {
        label: '2',
        children: [
          { label: '2-1', children: [{ label: '2-1-1' }] },
          { label: '2-2' },
        ],
      },
    ],
  }),
};
</script>

<style scoped>
</style>
