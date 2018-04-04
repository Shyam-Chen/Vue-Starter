<template>
  <v-layout column>
    <div class="headline">Form Controls - Text Fields</div>

    <v-form>

      <!-- input -->
      <v-layout row>
        <div>
          <v-text-field v-model="nickname" name="nickname" label="Nickname" class="vfs-field"></v-text-field>
        </div>
        <div class="vfs-outputs">{{ $td.nickname }}</div>
      </v-layout>

      <v-layout row>
        <div>
          <v-text-field v-model="nickname" :rules="$td.nicknameRules" name="nickname" label="Nickname" counter="15" class="vfs-field" required></v-text-field>
        </div>
        <div class="vfs-outputs">{{ $td.nickname }}</div>
      </v-layout>

      <v-layout row>
        <div>
          <v-text-field v-model="nickname" placeholder="ex. Larva" name="nickname" label="Nickname" class="vfs-field"></v-text-field>
        </div>
        <div class="vfs-outputs">{{ $td.nickname }}</div>
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
      return this.$store.state.formControls.textFields;
    },
    ...mapModelsToState('formControls.textFields', [
      'nickname',
    ]),
  },
  created() {
    this.$store.registerModule(
      ['formControls', 'textFields'],
      { namespaced: true, state, actions, mutations, getters },
    );
  },
};
</script>

<style scoped>
.vfs-field {
  width: 167px;
}

.vfs-outputs {
  align-self: center;
  margin: 0 0 0.5rem 0.5rem;
  color: #009688;
}
</style>
