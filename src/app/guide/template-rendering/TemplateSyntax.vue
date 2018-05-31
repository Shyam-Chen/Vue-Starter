<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Template Syntax</div>
    <div>Text {{ text }}</div>
    <div>{{ number + 1 }}</div>
  </v-layout>
</template>

<script>
// @flow

type Data = {
  text: string,
  number: number,
};

export default {
  data(): Data {
    return {
      text: 'foo',
      number: 10,
    };
  },
};
</script>

<style scoped>
</style>
