<template>
  <v-container fluid>
    <div class="headline">Authorization</div>

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
        <v-text-field v-model="email" label="Email"></v-text-field>
      </div>
      <div class="ml-2">
        <v-text-field v-model="password" label="Password" type="password"></v-text-field>
      </div>
      <v-btn color="primary" @click="signIn">Sign in</v-btn>
    </v-layout>

    <v-layout column>
      <div>
        <v-btn color="red" dark @click="signInWithGoogle">
          <v-icon left>fa fa-google</v-icon>
          Sign in with Google
        </v-btn>
      </div>

      <div>
        <v-btn color="indigo" dark disabled>
          <v-icon left>fa fa-facebook-official</v-icon>
          Sign in with Facebook
        </v-btn>
      </div>

      <div>
        <v-btn color="blue" dark disabled>
          <v-icon left>fa fa-twitter</v-icon>
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
import * as firebase from 'firebase/app';

export default {
  data() {
    return {
      email: 'qaz123@gmail.com',
      password: 'qaz123',

      isSignIn: false,

      currentUser: '',
    };
  },
  methods: {
    signIn() {
      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.isSignIn = true;
          console.log('signIn');
          // this.$router.replace('');
        });
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    signOut() {
      firebase.auth()
        .signOut()
        .then(() => {
          this.isSignIn = false;
          console.log('signOut');
          // this.$router.replace('');
        });
    },
  },
};
</script>

<style scoped>
</style>
