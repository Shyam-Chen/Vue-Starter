<template>
  <v-container>
    <v-layout column>
      <div>Text {{ text }}</div>
      <div>{{ number + 1 }}</div>
    </v-layout>

    <v-layout column>
      <div></div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      text: 'foo',
      number: 10,
    };
  },
};
</script>

<style scoped>
</style>
