<template>
  <v-container>

    <v-layout row>
      <div>
        <v-text-field v-visibility="isVisibility" label="Password" value="qaz123456" type="password"></v-text-field>
      </div>

      <v-btn flat icon color="indigo" @click="isVisibility = !isVisibility">
        <v-icon>{{ isVisibility ? 'visibility' : 'visibility_off' }}</v-icon>
      </v-btn>
    </v-layout>

  </v-container>
</template>

<script>
import visibility from './visibility';

export default {
  directives: {
    visibility,
  },
  data() {
    return {
      isVisibility: false,
    };
  },
};
</script>

<style scoped>
</style>
