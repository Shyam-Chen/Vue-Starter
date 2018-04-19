<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline">Form Controls - Pickers</div>

      <v-form>

        <v-layout row>
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="$p.date" transition="scale-transition" min-width="290px" lazy offset-y full-width>
            <v-text-field slot="activator" v-model="date" label="Picker in menu" prepend-icon="event" readonly></v-text-field>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="$p.menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save($p.date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <div class="primary--text vfs-outputs">{{ $p.date }}</div>
        </v-layout>

        <v-layout row>
          <v-dialog ref="dialog" v-model="dialog" :return-value.sync="$p.date" width="290px" persistent lazy full-width>
            <v-text-field slot="activator" v-model="date" label="Picker in dialog" prepend-icon="event" readonly></v-text-field>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="$p.dialog = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dialog.save($p.date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
          <div class="primary--text vfs-outputs">{{ $p.date }}</div>
        </v-layout>

        <!-- next -->
        <v-layout row>
          more...
        </v-layout>

      </v-form>

    </v-layout>
  </v-container>
</template>

<script>
// @flow

import { mapModelsToState } from 'vuex-bound';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  computed: {
    $p() {
      return this.$store.state.formControls.pickers;
    },
    ...mapModelsToState('formControls/pickers', [
      'date', 'menu', 'dialog',
    ]),
  },
  created() {
    if (!this.$store.state.formControls) {
      this.$store.registerModule(['formControls'], { namespaced: true });
    }

    this.$store.registerModule(
      ['formControls', 'pickers'],
      { namespaced: true, state, actions, mutations, getters },
    );
  },
};
</script>

<style scoped>
.vfs-outputs {
  align-self: center;
  margin: 0 0 0.5rem 0.5rem;
}
</style>
