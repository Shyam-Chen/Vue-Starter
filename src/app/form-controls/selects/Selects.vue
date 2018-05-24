<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline">Form Controls - Selects</div>

      <v-form>

        <!-- select -->
        <v-layout row>
          <div>
            <v-layout column>
              <div class="body-1">Dessert</div>
              <div>
                <v-select :items="s$.dessertList" v-model="dessert" label="Choose a dessert" class="vfs-select" single-line bottom></v-select>
              </div>
            </v-layout>
          </div>
          <div class="primary--text vfs-outputs">{{ s$.dessert }}</div>
        </v-layout>

        <!-- multiple select -->
        <v-layout row>
          <div>
            <v-layout column>
              <div class="body-1">States</div>
              <div>
                <v-select :items="s$.statesList" v-model="states" label="Select States" class="vfs-select--multiple" multiple chips single-line bottom></v-select>
              </div>
            </v-layout>
          </div>
          <div class="primary--text vfs-outputs">{{ s$.states }}</div>
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
import { mapModel } from 'vuex-bound';

import { formControlsStore } from '~/form-controls/mixins';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  mixins: [formControlsStore],
  computed: {
    s$() {
      return this.$store.state.formControls.selects;
    },
    ...mapModel('formControls/selects', [
      'dessert',
      'states',
    ]),
  },
  created() {
    this.$store.registerModule(
      ['formControls', 'selects'],
      { namespaced: true, state, actions, mutations, getters },
    );
  },
};
</script>

<style scoped>
.vfs-select {
  width: 167px;

  &--multiple {
    width: 300px;
  }
}

.vfs-outputs {
  align-self: center;
  margin: 0 0 0.5rem 0.5rem;
}
</style>
