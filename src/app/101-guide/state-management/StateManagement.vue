<template>
  <v-container fluid>
    <v-layout column>
      <v-layout row>
        <div class="headline pa-2">
          Clicked: <strong>{{ $c.value }}</strong> times, value is <strong>{{ evenOrOdd }}</strong>.
        </div>
      </v-layout>

      <v-layout row>
        <v-subheader class="pt-3">Step:</v-subheader>
        <div>
          <v-select :items="$c.stepList" v-model="$c.step" class="step" single-line></v-select>
        </div>
      </v-layout>

      <v-layout row>
        <v-btn color="primary" @click="increment">{{ $t('increment') }}</v-btn>
        <v-btn color="primary" @click="decrement">{{ $t('decrement') }}</v-btn>
      </v-layout>

      <v-layout row>
        <v-btn color="primary" @click="incrementAsync">{{ $t('increment') }} ({{ $t('async') }})</v-btn>
        <v-btn color="primary" @click="decrementAsync">{{ $t('decrement') }} ({{ $t('async') }})</v-btn>
        <v-btn color="primary" @click="incrementIfOdd">{{ $t('increment') }} ({{ $t('ifOdd') }})</v-btn>
        <v-btn color="primary" @click="decrementIfEven">{{ $t('decrement') }} ({{ $t('ifEven') }})</v-btn>
      </v-layout>

      <v-layout row>
        <v-btn color="primary" disabled>Start Count</v-btn>
        <v-btn color="primary" disabled>Cancel Count</v-btn>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
// @flow

import { mapActions, mapGetters } from 'vuex';

import { ICounter, INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  metaInfo: {
    title: 'State Management | Oh My Vue',
  },
  computed: {
    $c(): ICounter {
      return this.$store.state.counter;
    },
    ...mapGetters('counter', Object.keys(getters)),
  },
  created() {
    this.$store.registerModule('counter', { namespaced: true, state, actions, mutations, getters });
  },
  methods: {
    ...mapActions('counter', Object.keys(actions)),
  },
};
</script>

<style scoped>
.step {
  width: 5rem;
}
</style>
