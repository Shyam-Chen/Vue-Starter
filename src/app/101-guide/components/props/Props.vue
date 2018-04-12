<template>
  <v-container fluid>
    <v-layout column>
      <Title />
      <Title label="Vue by Example" />
    </v-layout>
  </v-container>
</template>

<script>
// @flow

import Title from './Title';

export default {
  components: {
    Title,
  },
};
</script>

<style scoped>
</style>
