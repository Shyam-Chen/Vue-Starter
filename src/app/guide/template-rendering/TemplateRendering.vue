<template>
  <v-container>
    <v-layout>
      Text {{ text }}
      {{ number + 1 }}
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
