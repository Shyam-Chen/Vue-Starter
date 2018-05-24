<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline">Form Controls - Pickers</div>

      <v-form>

        <v-layout row>
          <v-menu ref="dateMenu" v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="p$.date" transition="scale-transition" min-width="290px" lazy offset-y full-width>
            <v-text-field slot="activator" v-model="date" label="Picker in menu" prepend-icon="event" readonly></v-text-field>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="p$.dateMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dateMenu.save(p$.date)">OK</v-btn>
            </v-date-picker>
          </v-menu>

          <div class="primary--text vfs-outputs">{{ p$.date }}</div>
        </v-layout>

        <v-layout row>
          <v-dialog ref="dateDialog" v-model="dateDialog" :return-value.sync="p$.date" width="290px" persistent lazy full-width>
            <v-text-field slot="activator" v-model="date" label="Picker in dialog" prepend-icon="event" readonly></v-text-field>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="p$.dateDialog = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dateDialog.save(p$.date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <div class="primary--text vfs-outputs">{{ p$.date }}</div>
        </v-layout>

        <v-layout row>
          <v-menu ref="timeMenu" :close-on-content-click="false" v-model="timeMenu" :nudge-right="40" :return-value.sync="time" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
            <v-text-field slot="activator" v-model="time" label="Picker in menu" prepend-icon="access_time" readonly></v-text-field>
            <v-time-picker v-model="time" @change="$refs.timeMenu.save(time)"></v-time-picker>
          </v-menu>

          <div class="primary--text vfs-outputs">{{ p$.time }}</div>
        </v-layout>

        <v-layout row>
          <v-dialog ref="timeDialog" v-model="timeDialog" :return-value.sync="time" persistent lazy full-width width="290px">
            <v-text-field slot="activator" v-model="time" label="Picker in dialog" prepend-icon="access_time" readonly></v-text-field>
            <v-time-picker v-model="time" actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="p$.timeDialog = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.timeDialog.save(time)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
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

import { mapModel } from 'vuex-bound';

import { formControlsStore } from '~/form-controls/mixins';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  mixins: [formControlsStore],
  computed: {
    p$() {
      return this.$store.state.formControls.pickers;
    },
    ...mapModel('formControls/pickers', Object.keys(state)),
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
.vfs-outputs {
  align-self: center;
  margin: 0 0 0.5rem 0.5rem;
}
</style>
