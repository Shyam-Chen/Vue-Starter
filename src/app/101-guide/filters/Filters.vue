<template>
  <v-container>

    <v-layout>
      <div>
        <div class="headline">Truncate String</div>
        <div>{{ 'Approachable' | truncate }}</div>
        <div>{{ message | truncate }}</div>
        <div>{{ message | truncate(50) }}</div>
      </div>
    </v-layout>

  </v-container>
</template>

<script>
// @flow

import truncate from './truncate';

export default {
  filters: {
    truncate,
  },
  data() {
    return {
      message: 'Already know HTML, CSS and JavaScript? Read the guide and start building things in no time!',
    };
  },
};
</script>

<style scoped>
</style>
