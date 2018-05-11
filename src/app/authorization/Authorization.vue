<template>
  <v-container fluid>
    <div class="headline">Authorization (TODO)</div>

    <v-layout row>
      <div class="ml-2">
        <v-text-field label="Email"></v-text-field>
      </div>
      <div class="ml-2">
        <v-text-field label="Password"></v-text-field>
      </div>
      <v-btn color="primary" @click="void 0">Sign up</v-btn>
    </v-layout>

    <v-layout row>
      <div class="ml-2">
        <v-text-field label="Email"></v-text-field>
      </div>
      <div class="ml-2">
        <v-text-field label="Password"></v-text-field>
      </div>
      <v-btn color="primary" @click="void 0">Log in</v-btn>
    </v-layout>

    <v-layout column>
      <div>
        <v-btn color="red">
          <v-icon left>fa fa-google</v-icon>
          Sign in with Google
        </v-btn>
      </div>

      <div>
        <v-btn color="indigo">
          <v-icon left>fa fa-facebook-official</v-icon>
          Sign in with Facebook
        </v-btn>
      </div>

      <div>
        <v-btn color="blue">
          <v-icon left>fa fa-twitter</v-icon>
          Sign in with Twitter
        </v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
// @flow

export default {};
</script>

<style scoped>
</style>
