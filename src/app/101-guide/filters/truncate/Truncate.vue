<template>
  <v-container fluid>
    <v-layout column>
      <div class="body-1">{{ 'Approachable' | truncate }}</div>
      <div class="body-1">{{ message | truncate }}</div>
      <div class="body-1">{{ message | truncate(50) }}</div>
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
