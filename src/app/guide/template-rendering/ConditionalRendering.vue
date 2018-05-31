<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Conditional Rendering</div>
    <div v-if="show">Can see this text</div>
    <div v-if="!show">Can't see this text</div>
  </v-layout>
</template>

<script>
// @flow

type Data = {
  show: boolean,
};

export default {
  data(): Data {
    return {
      show: true,
    };
  },
};
</script>

<style scoped>
</style>
