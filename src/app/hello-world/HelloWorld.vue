<template>
  <v-container fluid>
    <v-layout>
      <div class="title">{{ message }}</div>
    </v-layout>
  </v-container>
</template>

<script>
// @flow

type Data = {
  message: string,
};

export default {
  metaInfo: {
    title: 'Hello World | Oh My Vue',
    meta: [
      { property: 'og:title', content: 'Hello World | Oh My Vue' },
    ],
  },
  data(): Data {
    return {
      message: 'Hello, World!',
    };
  },
};
</script>

<style scoped>
</style>
