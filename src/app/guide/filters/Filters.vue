<template>
  <v-container>

    <v-layout>
      <div class="mb-3">
        <div class="headline">Reverse String/Array</div>
        <div class="ml-3 mb-2">{{ 'Vanilla Angular React Vue' | reverse }}</div>
        <template v-for="item in reverse(list)">
          <div :key="item" class="ml-3">{{ item }}</div>
        </template>
      </div>
    </v-layout>

    <v-layout>
      <div>
        <div class="headline">Truncate String</div>
        <div class="ml-3">{{ 'Approachable' | truncate }}</div>
        <div class="ml-3">{{ message | truncate }}</div>
        <div class="ml-3">{{ message | truncate(50) }}</div>
      </div>
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
</style>
