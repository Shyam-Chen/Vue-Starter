<template>
  <v-container id="selection-controls" class="shell-container" fluid>
    <v-layout column>
      <div class="headline">Controls - Selection Controls</div>

      <v-form>
        <!-- checkboxes -->
        <v-layout row>
          <div>
            <v-layout column>
              <div class="body-1">Technologies</div>
              <div>
                <v-layout row wrap>
                  <v-checkbox v-for="item in sc$.technologiesList" :key="item" v-model="technologies" :label="item" :value="item" class="o-checkbox"></v-checkbox>
                </v-layout>
              </div>
            </v-layout>
          </div>
          <div class="primary--text o-outputs">{{ sc$.technologies }}</div>
        </v-layout>

        <!-- radios -->
        <v-layout row>
          <div>
            <v-layout column>
              <div class="body-1">Gender</div>
              <div>
                <v-radio-group v-model="gender" class="o-radio-group" row>
                  <v-radio v-for="item in sc$.genderList" :key="item" :label="item" :value="item"></v-radio>
                </v-radio-group>
              </div>
            </v-layout>
          </div>
          <div class="primary--text o-outputs">{{ sc$.gender }}</div>
        </v-layout>

        <!-- switch -->
        <v-layout row>
          <div>
            <v-layout column>
              <div class="body-1">Video Player</div>
              <div>
                <v-switch v-model="autoplay" label="Autoplay" class="o-switch"></v-switch>
              </div>
            </v-layout>
          </div>
          <div class="primary--text o-outputs">{{ sc$.autoplay }}</div>
        </v-layout>

        <!-- slider -->
        <v-layout row>
          <div>
            <v-layout column>
              <div class="body-1">Media Volume</div>
              <div>
                <v-slider v-model="volume" prepend-icon="volume_up" step="2" class="o-slider" thumb-label></v-slider>
              </div>
            </v-layout>
          </div>
          <div class="primary--text o-outputs">{{ sc$.volume }}</div>
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
    sc$() {
      return this.$store.state.controls.selectionControls;
    },
    ...mapModel('controls/selectionControls', [
      'technologies',
      'gender',
      'autoplay',
      'volume',
    ]),
  },
  created() {
    this.$store.registerModule(
      ['controls', 'selectionControls'],
      { namespaced: true, state, actions, mutations, getters },
    );
  },
};
</script>

<style scoped>
.o-checkbox {
  width: 10rem;
}

.o-radio-group,
.o-slider {
  width: 300px;
}

.o-switch {
  width: 120px;
}

.o-outputs {
  align-self: center;
  margin: 0 0 0.5rem 0.5rem;
}
</style>
