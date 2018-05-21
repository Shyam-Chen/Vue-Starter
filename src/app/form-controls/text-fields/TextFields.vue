<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline">Form Controls - Text Fields</div>

      <v-form>

        <!-- input -->
        <v-layout row>
          <div>
            <v-text-field v-model="nickname" name="nickname" label="Nickname" class="vfs-field"></v-text-field>
          </div>
          <div class="primary--text vfs-outputs">{{ $tf.nickname }}</div>
        </v-layout>

        <v-layout row>
          <div>
            <v-text-field v-model="nickname" :rules="$tf.nicknameRules" name="nickname" label="Nickname" counter="15" class="vfs-field" required></v-text-field>
          </div>
          <div class="primary--text vfs-outputs">{{ $tf.nickname }}</div>
        </v-layout>

        <v-layout row>
          <div>
            <v-text-field v-model="nickname" placeholder="ex. Larva" name="nickname" label="Nickname" class="vfs-field"></v-text-field>
          </div>
          <div class="primary--text vfs-outputs">{{ $tf.nickname }}</div>
        </v-layout>

        <v-layout row>
          <div>
            <v-text-field v-model="nickname" name="nickname" label="Nickname" class="vfs-field" textarea></v-text-field>
          </div>
          <div class="primary--text vfs-outputs">{{ $tf.nickname }}</div>
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

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  computed: {
    $tf() {
      return this.$store.state.formControls.textFields;
    },
    ...mapModel('formControls/textFields', [
      'nickname',
    ]),
  },
  created() {
    if (!this.$store.state.formControls) {
      this.$store.registerModule(['formControls'], { namespaced: true });
    }

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
}
</style>
