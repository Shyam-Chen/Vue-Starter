<template>
  <v-container id="text-fields" class="shell-container" fluid>
    <v-layout column>
      <div class="headline">Controls - Text Fields</div>

      <v-form>
        <!-- input -->
        <v-layout row>
          <div>
            <v-text-field
              v-model="nickname"
              name="nickname"
              label="Nickname"
              class="field"
            ></v-text-field>
          </div>
          <div class="primary--text outputs">{{ tf$.nickname }}</div>
        </v-layout>

        <v-layout row>
          <div>
            <v-text-field
              v-model="nickname"
              :rules="tf$.nicknameRules"
              name="nickname"
              label="Nickname"
              counter="15"
              class="field"
              required
            ></v-text-field>
          </div>
          <div class="primary--text outputs">{{ tf$.nickname }}</div>
        </v-layout>

        <v-layout row>
          <div>
            <v-text-field
              v-model="nickname"
              placeholder="e.g. Larva"
              name="nickname"
              label="Nickname"
              class="field"
            ></v-text-field>
          </div>
          <div class="primary--text outputs">{{ tf$.nickname }}</div>
        </v-layout>

        <v-layout row>
          <div>
            <v-textarea
              v-model="nickname"
              name="nickname"
              label="Nickname"
              class="field"
            ></v-textarea>
          </div>
          <div class="primary--text outputs">{{ tf$.nickname }}</div>
        </v-layout>

        <v-layout row>
          <div>
            <v-text-field
              v-model="creditCard"
              mask="credit-card"
              label="Credit Card"
              class="credit-card"
            ></v-text-field>
          </div>
          <div class="primary--text outputs">{{ tf$.creditCard }}</div>
        </v-layout>

        <v-layout row>
          <div>
            <v-text-field
              v-model="phone"
              mask="(##) #### - ####"
              label="Phone"
              class="credit-card"
            ></v-text-field>
          </div>
          <div class="primary--text outputs">{{ tf$.phone }}</div>
        </v-layout>

        <v-layout row>
          <div>
            <v-text-field
              v-model="email"
              :rules="tf$.emailRules"
              label="Email"
              class="email"
            ></v-text-field>
          </div>
          <div class="primary--text outputs">{{ tf$.email }}</div>
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
    tf$() {
      return this.$store.state.controls.textFields;
    },
    ...mapModel('controls/textFields', ['nickname', 'creditCard', 'phone', 'email']),
  },
  created() {
    this.$store.registerModule(['controls', 'textFields'], {
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
.field {
  width: 167px;
}

.outputs {
  align-self: center;
  margin: 0 0 0.5rem 0.5rem;
}

.credit-card,
.email {
  width: 15rem;
}
</style>
