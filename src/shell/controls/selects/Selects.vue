<template>
  <v-container id="selects" class="shell-container" fluid>
    <v-layout column>
      <div class="headline">Controls - Selects</div>

      <v-form>
        <!-- select -->
        <v-layout row>
          <div>
            <v-layout column>
              <div class="body-1">Dessert</div>
              <div>
                <v-select
                  v-model="dessert"
                  :items="s$.dessertList"
                  label="Choose a dessert"
                  class="o-select"
                  single-line
                  bottom
                ></v-select>
              </div>
            </v-layout>
          </div>
          <div class="primary--text o-outputs">{{ s$.dessert }}</div>
        </v-layout>

        <!-- multiple select -->
        <v-layout row>
          <div>
            <v-layout column>
              <div class="body-1">States</div>
              <div>
                <v-select
                  v-model="states"
                  :items="s$.statesList"
                  label="Select States"
                  class="o-select--multiple"
                  multiple
                  chips
                  single-line
                  bottom
                ></v-select>
              </div>
            </v-layout>
          </div>
          <div class="primary--text o-outputs">{{ s$.states }}</div>
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

import { controlsStore } from '../mixins';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  mixins: [controlsStore],
  computed: {
    s$() {
      return this.$store.state.controls.selects;
    },
    ...mapModel('controls/selects', ['dessert', 'states']),
  },
  created() {
    this.$store.registerModule(['controls', 'selects'], {
      namespaced: true,
      state,
      actions,
      mutations,
      getters,
    });
  },
};
</script>

<style scoped>
.o-select {
  width: 167px;

  &--multiple {
    width: 300px;
  }
}

.o-outputs {
  align-self: center;
  margin: 0 0 0.5rem 0.5rem;
}
</style>
