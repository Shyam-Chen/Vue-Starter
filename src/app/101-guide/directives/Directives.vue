<template>
  <v-container>

    <v-layout row>
      <div>
        <v-text-field v-visibility="isVisibility" label="Password" value="qaz123456" type="password"></v-text-field>
      </div>

      <v-btn flat icon @click="isVisibility = !isVisibility">
        <v-icon>{{ isVisibility ? 'visibility' : 'visibility_off' }}</v-icon>
      </v-btn>
    </v-layout>

    <v-layout row>
      <div>
        <v-text-field :append-icon="isVisibility ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (isVisibility = !isVisibility)" :type="isVisibility ? 'password' : 'text'" label="Password" value="qaz123456"></v-text-field>
      </div>
    </v-layout>

  </v-container>
</template>

<script>
import visibility from './visibility';

export default {
  directives: {
    visibility,  // v-visibility
  },
  data() {
    return {
      isVisibility: true,
    };
  },
};
</script>

<style scoped>
</style>
