<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div class="headline mb-1">Mixins</div>
    </v-layout>

    <div>Message1: {{ message1 }}</div>
    <div>Message2: {{ message2 }}</div>
  </v-container>
</template>

<script>
import { hello } from './hello';

export default {
  mixins: [hello],
  data() {
    return {
      // shallow merge
      message1: 'Goodbye',
    };
  },
};
</script>

<style scoped>
</style>
