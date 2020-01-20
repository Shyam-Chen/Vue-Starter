<template>
  <v-container id="authorization" class="shell-container" fluid>
    <div class="headline">Authorization (TODO)</div>

    <v-layout row>
      <div class="ml-2">
        <v-text-field label="Email" disabled></v-text-field>
      </div>
      <div class="ml-2">
        <v-text-field label="Password" type="password" disabled></v-text-field>
      </div>
      <v-btn color="primary" disabled @click="void 0">Sign up</v-btn>
    </v-layout>

    <v-layout v-if="!isSignIn" row>
      <div class="ml-2">
        <v-text-field v-model="email" label="Email" disabled></v-text-field>
      </div>
      <div class="ml-2">
        <v-text-field v-model="password" label="Password" type="password" disabled></v-text-field>
      </div>
      <v-btn color="primary" disabled @click="signIn">Sign in</v-btn>
      <v-progress-circular v-if="isInProgress" indeterminate color="primary"></v-progress-circular>
    </v-layout>

    <v-layout>
      Forgot Password
    </v-layout>

    <v-layout>
      Change password
    </v-layout>

    <v-divider class="my-3"></v-divider>

    <v-layout column>
      <div>
        <v-btn color="red" disabled @click="signInWithGoogle">
          <v-icon left>fab fa-google</v-icon>
          Sign in with Google
        </v-btn>
      </div>

      <div>
        <v-btn color="indigo" disabled>
          <v-icon left>fab fa-facebook</v-icon>
          Sign in with Facebook
        </v-btn>
      </div>

      <div>
        <v-btn color="blue" disabled>
          <v-icon left>fab fa-twitter</v-icon>
          Sign in with Twitter
        </v-btn>
      </div>
    </v-layout>

    <v-layout v-if="isSignIn">
      <div>
        <v-btn @click="signOut">
          <v-icon left>account_circle</v-icon>
          Sign out
        </v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: 'qaz123@gmail.com',
      password: 'qaz123',

      isSignIn: false,

      isInProgress: false,

      currentUser: '',
    };
  },
  methods: {
    signIn() {},
    signInWithGoogle() {},
  },
};
</script>
