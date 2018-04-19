<template>
  <div>
    <v-jumbotron dark gradient="to bottom, #1E88E5, #42A5F5" height="auto">
      <v-container fill-height>
        <v-layout justify-center align-center wrap>
          <v-flex shrink>
            <img src="assets/images/logo.svg" alt="Logo" width="300" height="300" />
            <h3 class="display-3">Welcome to the site</h3>
            <span class="subheading">ABCD</span>
            <v-divider class="my-3"></v-divider>
            <div class="title mb-3">Check out our newest features!</div>
            <v-btn large color="white" to="/hello-world" class="primary--text mx-0">See more</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

    <v-container grid-list-xl class="mt-5 mb-5">
      <v-layout row justify-center>
        <v-flex xs4>
          <div class="elevation-1" style="height: 256px;">
            Standard Image
          </div>
        </v-flex>

        <v-flex xs4>
          <div>
            Standard Content
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-xl class="mt-5 mb-5">
      <v-layout row justify-center>
        <v-flex xs4>
          <div>
            Playground Content
          </div>
        </v-flex>

        <v-flex xs4>
          <div class="elevation-1" style="height: 256px;">
            Playground Image
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-xl class="mt-5 mb-5">
      <v-layout row justify-center>
        <v-btn large color="primary" to="/hello-world">See more</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Vue by Example',
  },
};
</script>

<style scoped>
</style>
