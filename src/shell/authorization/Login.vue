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

            <v-flex xs12>
              or
            </v-flex>

            <v-flex xs12>
              <FacebookLogin app-id="XXX" version="v9.0" @login="fb" />
            </v-flex>

            <!-- <v-flex xs12 class="text-xs-right mt-3">
              <v-btn color="primary" @click="signInWithFb">Continue with Facebook</v-btn>
            </v-flex> -->

            <v-flex xs12>
              <div>{{ me }}</div>
            </v-flex>
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
import FacebookLogin from 'vue-facebook-login-component';
import axios from 'axios';

export default {
  components: {
    FacebookLogin,
  },
  data() {
    return {
      me: {},
      email: '',
      password: '',

      isSignIn: false,

      isInProgress: false,

      currentUser: '',
    };
  },
  methods: {
    signIn() {},
    signInWithGoogle() {},
    fb({ authResponse }) {
      axios
        .get('http://0.0.0.0:3000/authentication/facebook/token', {
          params: {
            access_token: authResponse.accessToken,
          },
        })
        .then(({ data }) => {
          this.me = data;
        });
    },
    // signInWithFb() {
    //   const vm = this;

    //   // eslint-disable-next-line
    //   FB.login(
    //     response => {
    //       if (response.status === 'connected') {
    //         // Logged into your webpage and Facebook.

    //         axios
    //           .get('http://0.0.0.0:3000/authentication/facebook/token', {
    //             params: {
    //               access_token: response.authResponse.accessToken,
    //             },
    //           })
    //           .then(res => {
    //             vm.me = res.data;
    //           });
    //       } else {
    //         // The person is not logged into your webpage or we are unable to tell.
    //       }
    //     },
    //     { scope: 'email' },
    //   );
    // },
  },
};
</script>
