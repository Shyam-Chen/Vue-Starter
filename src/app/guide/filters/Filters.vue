<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline mb-1">Filters</div>

      <v-layout column class="mt-1 mb-1">
        <div class="title mb-2">Reverse String/Array</div>

        <div>{{ 'Vanilla Angular React Vue' | reverse }}</div>

        <template v-for="item in reverse(list)">
          <div :key="item">{{ item }}</div>
        </template>
      </v-layout>

      <v-layout column class="mt-1 mb-1">
        <div class="title mb-2">Truncate String</div>

        <div>{{ 'Approachable' | truncate }}</div>
        <div>{{ message | truncate }}</div>
        <div>{{ message | truncate(50) }}</div>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
// @flow

import reverse from './reverse';
import truncate from './truncate';

export default {
  filters: {
    reverse,
    truncate,
  },
  data() {
    return {
      list: ['Vanilla', 'Angular', 'React', 'Vue'],
      message: 'Already know HTML, CSS and JavaScript? Read the guide and start building things in no time!',
    };
  },
  methods: {
    reverse,
  },
};
</script>

<style scoped>
.layout:not(:first-child) {
  padding: 1rem;
}
</style>
