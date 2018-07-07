<template>
  <v-layout column class="my-1">
    <div class="title mb-2">Form Input Bindings</div>

    <v-layout row align-center>
      <div>
        <v-text-field v-model="message" name="message" label="Message"></v-text-field>
      </div>
      <div class="ml-3">{{ message }}</div>
    </v-layout>
  </v-layout>
</template>

<script>
// @flow

type Data = {
  message: string,
};

export default {
  data(): Data {
    return {
      message: '',
    };
  },
};
</script>

<style scoped>
</style>
