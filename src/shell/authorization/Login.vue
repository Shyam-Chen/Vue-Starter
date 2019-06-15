<template>
  <v-container fluid fill-height>
    <v-layout column justify-center align-center>
      <div>
        <v-card width="448">
          <v-card-title primary-title>
            <v-layout row wrap justify-center>
              <v-flex xs12>
                <h3 class="headline text-xs-center mb-3">Sign in</h3>
              </v-flex>

              <v-flex xs8>
                <v-text-field v-model="email" label="Email"></v-text-field>
              </v-flex>

              <v-flex xs8>
                <v-text-field v-model="password" label="Password" type="password"></v-text-field>
              </v-flex>

              <v-flex xs12 class="text-xs-right mt-3">
                <v-btn color="primary" @click="signIn">Sign in</v-btn>
              </v-flex>
            </v-layout>
          </v-card-title>
        </v-card>

        <v-layout row>
          <v-flex>Help</v-flex>
          <v-flex>Privacy</v-flex>
          <v-flex>Terms</v-flex>
        </v-layout>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',

      isSignIn: false,

      isInProgress: false,

      currentUser: '',
    };
  },
  methods: {
    signIn() {

    },
    signInWithGoogle() {

    },
  },
};
</script>

<style scoped>
</style>
