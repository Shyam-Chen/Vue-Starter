<template>
  <v-container>
    <div>Message: {{ message }}</div>
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
      message: 'Goodbye',
    };
  },
};
</script>

<style scoped>
</style>
