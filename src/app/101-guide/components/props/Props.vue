<template>
  <v-layout column>
    <Title />
    <Title label="Vue by Example" />
  </v-layout>
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
