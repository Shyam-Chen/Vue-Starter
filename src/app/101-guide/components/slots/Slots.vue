<template>
  <v-layout column>

    <Card />

    <Card>
      <div slot="title">Vue</div>
      <div slot="body">Approachable! Versatile! Performant!</div>
      <v-btn slot="button" flat color="orange">Share</v-btn>
      <v-btn slot="button" flat color="orange">Explore</v-btn>
    </Card>

  </v-layout>
</template>

<script>
// @flow

import Card from './Card';

export default {
  components: {
    Card,
  },
};
</script>

<style scoped>
</style>
