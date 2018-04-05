<template>
  <v-layout column>
    <div class="headline">Form Controls - Pickers</div>

    <v-form>

      <v-layout row>
        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date" transition="scale-transition" min-width="290px" lazy offset-y full-width>
          <v-text-field slot="activator" v-model="date" label="Picker in menu" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-layout>

      <v-layout row>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" width="290px" persistent lazy full-width>
          <v-text-field slot="activator" v-model="date" label="Picker in dialog" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-layout>

    </v-form>

  </v-layout>
</template>

<script>
// @flow

import { mapModelsToState } from 'vuex-bound';  // eslint-disable-line

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  computed: {
    $td() {
      return this.$store.state.formControls.selects;
    },
    ...mapModelsToState('formControls.pickers', [
      'date', 'menu',
    ]),
  },
  created() {
    this.$store.registerModule(
      ['formControls', 'pickers'],
      { namespaced: true, state, actions, mutations, getters },
    );
  },
};
</script>

<style scoped>
</style>
