<template>
  <v-container fluid>
    <v-layout>
      <div class="title">{{ message }}</div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: 'Hello World | Oh My Vue',
    meta: [
      { property: 'og:title', content: 'Hello World | Oh My Vue' },
    ],
  },
  data() {
    return {
      message: 'Hello, World!',
    };
  },
};
</script>

<style scoped>
</style>
