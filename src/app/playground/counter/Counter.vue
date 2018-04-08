<i18n src="./translation.yml"></i18n>

<template>
  <v-layout column>
    <v-layout row>
      <div class="headline pa-2">
        Clicked: <strong>{{ $c.value }}</strong> times,
        value is <strong>{{ evenOrOdd }}</strong>.
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
</template>

<script>
// @flow

import { mapActions, mapGetters } from 'vuex';  // eslint-disable-line

import { ICounter, INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  metaInfo: {
    title: 'Counter | Vue by Example',
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
</style>
