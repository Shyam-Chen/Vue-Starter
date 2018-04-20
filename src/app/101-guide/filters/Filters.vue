<template>
  <v-container fluid grid-list-xl>

    <v-layout row justify-center>
      <v-flex xs6>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">Truncate String</div>
              <div class="body-1">{{ 'Approachable' | truncate }}</div>
              <div class="body-1">{{ message | truncate }}</div>
              <div class="body-1">{{ message | truncate(50) }}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-flex xs6>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">Next</div>
              <div class="body-1">...</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
// @flow

import truncate from './truncate';

export default {
  filters: {
    truncate,
  },
  data() {
    return {
      message: 'Already know HTML, CSS and JavaScript? Read the guide and start building things in no time!',
    };
  },
};
</script>

<style scoped>
</style>
