<template>
  <v-container fluid>
    <v-layout column>
      <div class="body-1">{{ 10 | bytes }}</div>
      <div class="body-1">{{ 1024 | bytes }}</div>
      <div class="body-1">{{ 1048576 | bytes }}</div>
      <div class="body-1">{{ 1073741824 | bytes }}</div>
      <div class="body-1">{{ 1.0995116e12 | bytes }}</div>
    </v-layout>
  </v-container>
</template>

<script>
// @flow

import bytes from './bytes';

export default {
  filters: {
    bytes,
  },
};
</script>

<style scoped>
</style>
