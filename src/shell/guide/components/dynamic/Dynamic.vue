<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div>
        <v-btn :class="{ primary: view === 'A' }" @click="view = 'A'">A</v-btn>
        <v-btn :class="{ primary: view === 'B' }" @click="view = 'B'">B</v-btn>
        <v-btn :class="{ primary: view === 'C' }" @click="view = 'C'">C</v-btn>
      </div>

      <keep-alive>
        <component :is="currentView"></component>
      </keep-alive>
    </v-layout>
  </v-container>
</template>

<script>
// @flow

import ViewA from './ViewA';
import ViewB from './ViewB';
import ViewC from './ViewC';

type Data = {
  view: string,
};

export default {
  data(): Data {
    return {
      view: 'A',
    };
  },
  computed: {
    currentView() {
      if (this.view === 'B') return ViewB;
      if (this.view === 'C') return ViewC;
      return ViewA;
    },
  },
};
</script>
