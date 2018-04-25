<template>
  <div>
    <v-jumbotron dark gradient="to bottom, #1E88E5, #42A5F5" height="auto">
      <v-container fill-height class="pt-5 pb-5">
        <v-layout justify-center align-center wrap>
          <img src="assets/images/logo.svg" alt="Logo" width="256" height="256">

          <v-flex shrink class="text-xs-center text-md-left">
            <div class="display-3">Oh My Vue</div>
            <div class="subheading">Vue Fullstack • Firebase Platform • Google Cloud</div>
            <v-divider class="my-3"></v-divider>
            <v-btn large color="white" to="/hello-world" class="primary--text ml-0">See more</v-btn>
            <v-btn color="white" href="https://github.com/Shyam-Chen/Vue-Fullstack-Starter" large outline target="_blank">
              <v-icon left>fa fa-github</v-icon>
              GitHub
            </v-btn>
            <v-btn color="white" href="https://github.com/Shyam-Chen/Vue-Fullstack-Template" large outline target="_blank">
              <v-icon left>fa fa-file-code-o</v-icon>
              Template
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

    <v-container fill-height class="mt-5">
      <v-layout row justify-center wrap>
        <v-icon class="pa-3 grid" size="15rem">fa fa-cubes</v-icon>

        <div class="pa-3 grid">
          <v-layout row justify-center align-center>
            <div>
              <div class="headline pb-2">Sprint from Zero to App</div>
              <div class="body-1">Hit the ground running with comprehensive, modern UI components that work across the web, mobile and desktop.</div>
            </div>
          </v-layout>
        </div>
      </v-layout>
    </v-container>

    <v-container fill-height>
      <v-layout :reverse="!isMobile" row justify-center wrap>
        <v-icon class="pa-3 grid" size="15rem">av_timer</v-icon>

        <div class="pa-3 grid">
          <v-layout row justify-center align-center>
            <div>
              <div class="headline pb-2">Fast and Consistent</div>
              <div class="body-1">Finely tuned performance, because every millisecond counts. Fully tested across modern browsers.</div>
            </div>
          </v-layout>
        </div>
      </v-layout>
    </v-container>

    <v-container fill-height class="mb-5">
      <v-layout row justify-center wrap>
        <v-icon class="pa-3 grid" size="15rem">color_lens</v-icon>

        <div class="pa-3 grid">
          <v-layout row justify-center align-center>
            <div>
              <div class="headline pb-2">Versatile</div>
              <div class="body-1">Themable, for when you need to stay on brand or just have a favorite color. Accessible and internationalized so that all users are welcome.</div>
            </div>
          </v-layout>
        </div>
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
    title: 'Oh My Vue',
  },
  data() {
    return {
      isMobile: window.innerWidth < 600,
    };
  },
};
</script>

<style scoped>
.grid {
  width: 25rem;
}
</style>
