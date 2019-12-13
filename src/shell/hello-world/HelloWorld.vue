<template>
  <v-container id="hello-world" class="shell-container" fluid>
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
      { property: 'og:description', content: 'A bare-bones Hello World example.' },
      { name: 'twitter:title', content: 'Hello World | Oh My Vue' },
      { name: 'twitter:description', content: 'A bare-bones Hello World example.' },
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
