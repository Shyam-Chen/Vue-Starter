<template>
  <v-container class="shell-container" fluid>
    <v-layout align-center>
      <v-btn @click="increment">Increment</v-btn>
      <div ref="count">0</div>
    </v-layout>
  </v-container>
</template>

<script>
// @flow

export default {
  methods: {
    increment(): void {
      const { count } = this.$refs;

      if (count) {
        count.innerText = Number(count.innerText) + 1;
      }
    },
  },
};
</script>
