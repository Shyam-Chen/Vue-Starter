<template>
  <v-layout column>
    <div class="headline">Form Controls - Selection Controls</div>

    <v-form>

      <!-- checkboxes -->
      <v-layout row>
        <div>
          <v-layout column>
            <div class="body-1">Technologies</div>
            <div>
              <v-layout row wrap>
                <v-checkbox v-for="item in $td.technologiesList" :key="item" :label="item" :value="item" v-model="technologies" class="vfs-checkbox"></v-checkbox>
              </v-layout>
            </div>
          </v-layout>
        </div>
        <div class="vfs-outputs">{{ $td.technologies }}</div>
      </v-layout>

      <!-- radios -->
      <v-layout row>
        <div>
          <v-layout column>
            <div class="body-1">Gender</div>
            <div>
              <v-radio-group v-model="gender" class="vfs-radio-group" row>
                <v-radio v-for="item in $td.genderList" :key="item" :label="item" :value="item"></v-radio>
              </v-radio-group>
            </div>
          </v-layout>
        </div>
        <div class="vfs-outputs">{{ $td.gender }}</div>
      </v-layout>

      <!-- switch -->
      <v-layout row>
        <div>
          <v-layout column>
            <div class="body-1">Video Player</div>
            <div>
              <v-switch v-model="autoplay" label="Autoplay" class="vfs-switch"></v-switch>
            </div>
          </v-layout>
        </div>
        <div class="vfs-outputs">{{ $td.autoplay }}</div>
      </v-layout>

      <!-- slider -->
      <v-layout row>
        <div>
          <v-layout column>
            <div class="body-1">Media Volume</div>
            <div>
              <v-slider v-model="volume" prepend-icon="volume_up" step="2" class="vfs-slider" thumb-label></v-slider>
            </div>
          </v-layout>
        </div>
        <div class="vfs-outputs">{{ $td.volume }}</div>
      </v-layout>

      <!-- next -->
      <v-layout row>
        ...
      </v-layout>

    </v-form>

  </v-layout>
</template>

<script>
import { mapModelsToState } from 'vuex-bound';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  computed: {
    $td() {
      return this.$store.state.formControls.selectionControls;
    },
    ...mapModelsToState('formControls.selectionControls', [
      'technologies',
      'gender',
      'autoplay',
      'volume',
    ]),
  },
  created() {
    this.$store.registerModule(
      ['formControls', 'selectionControls'],
      { namespaced: true, state, actions, mutations, getters },
    );
  },
};
</script>

<style scoped>
.vfs-checkbox {
  width: 10rem;
}

.vfs-radio-group,
.vfs-slider {
  width: 300px;
}

.vfs-switch {
  width: 120px;
}

.vfs-outputs {
  align-self: center;
  margin: 0 0 0.5rem 0.5rem;
  color: #009688;
}
</style>
