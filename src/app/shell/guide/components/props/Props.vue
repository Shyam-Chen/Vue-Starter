<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <Title />
      <Title label="Oh My Vue" />
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
