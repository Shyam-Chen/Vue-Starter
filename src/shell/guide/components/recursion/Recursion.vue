<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div class="headline mb-1">Recursion</div>

      <v-layout column>
        <div class="title mb-2">Trees</div>

        <template v-for="tree in trees">
          <Tree :key="tree.label" :tree="tree" />
        </template>
      </v-layout>

      <v-layout column>
        <div class="title mb-2">Recursive List</div>

        <ul>
          <RecursiveList :data="list" />
        </ul>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import Tree from './Tree';
import RecursiveList from './RecursiveList';

export default {
  components: {
    Tree,
    RecursiveList,
  },
  data() {
    return {
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
                  label: '1-1-3',
                  children: [{ label: '1-1-3-1' }],
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
    };
  },
  computed: {
    list() {
      return [...this.trees];
    },
  },
};
</script>

<style scoped>
</style>
