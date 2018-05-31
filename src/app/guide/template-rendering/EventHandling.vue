<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Event Handling</div>

    <div>
      <v-btn class="ml-0" @click="increment">Click Me</v-btn>
      <div>The button above has been clicked {{ count }} times.</div>
    </div>
  </v-layout>
</template>

<script>
// @flow

type Data = {
  count: number,
};

export default {
  data(): Data {
    return {
      count: 0,
    };
  },
  methods: {
    increment(): void {
      this.count += 1;
    },
  },
};
</script>

<style scoped>
</style>
