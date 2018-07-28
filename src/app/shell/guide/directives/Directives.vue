<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div class="headline mb-1">Directives</div>

      <Visibility />
    </v-layout>
  </v-container>
</template>

<script>
import Visibility from './Visibility';

export default {
  components: {
    Visibility,
  },
};
</script>

<style scoped>
.layout:not(:first-child) {
  padding: 1rem;
}
</style>
