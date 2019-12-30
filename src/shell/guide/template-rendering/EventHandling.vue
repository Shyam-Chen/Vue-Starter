<template>
  <v-layout column class="my-1">
    <div class="title mb-2">Event Handling</div>

    <div>
      <v-btn class="ml-0" @click="increment">Click Me</v-btn>
      <div>The button above has been clicked {{ count }} times.</div>
    </div>

    <div>
      <div @click="outer">
        <v-btn @click="inner">Click Me</v-btn>
      </div>

      <div>Use `event.stopPropagation()`</div>
      <div @click="outer">
        <v-btn @click.stop="inner">Click Me</v-btn>
      </div>
    </div>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
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

    outer(): void {
      console.log('[*] Outer');
    },
    inner(): void {
      console.log('[*] Inner');
    },
  },
};
</script>

<style scoped>
</style>
