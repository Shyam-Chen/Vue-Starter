<template>
  <v-layout column>
    <div class="headline">Form Controls - Template-driven</div>

    <form>

      <!-- input -->
      <v-layout row>
        <div>
          <v-text-field name="nickname" label="Nickname" v-model="nickname"></v-text-field>
        </div>
        <div class="outputs">{{ $td.nickname }}</div>
      </v-layout>

      <!-- select -->
      <v-layout row>
        <div>
          <v-layout column>
            <div class="body-1">Dessert</div>
            <div>
              <v-select :items="$td.dessertList" v-model="dessert" label="Choose a dessert" style="width: 167px" single-line bottom></v-select>
            </div>
          </v-layout>
        </div>
        <div class="outputs">{{ $td.dessert }}</div>
      </v-layout>

      <!-- multiple select -->
      <v-layout row>
        <div>
          <v-layout column>
            <div class="body-1">States</div>
            <div>
              <v-select :items="$td.statesList" v-model="states" label="Select States" style="width: 300px" multiple chips single-line bottom></v-select>
            </div>
          </v-layout>
        </div>
        <div class="outputs">{{ $td.states }}</div>
      </v-layout>

      <!-- checkboxes -->
      <v-layout row>
        <div>
          <v-layout column>
            <div class="body-1">Technologies</div>
            <div>
              <v-layout row wrap>
                <v-checkbox style="width: 10rem" v-for="item in $td.technologiesList" :key="item" :label="item" :value="item" v-model="technologies"></v-checkbox>
              </v-layout>
            </div>
          </v-layout>
        </div>
        <div class="outputs">{{ $td.technologies }}</div>
      </v-layout>

      <!-- radios -->
      <v-layout row>
        <div>
          <v-layout column>
            <div class="body-1">Gender</div>
            <div>
              <v-radio-group row style="width: 300px" v-model="gender">
                <v-radio v-for="item in $td.genderList" :key="item" :label="item" :value="item"></v-radio>
              </v-radio-group>
            </div>
          </v-layout>
        </div>
        <div class="outputs">{{ $td.gender }}</div>
      </v-layout>

      <!-- switch -->
      <v-layout row>
        <div>
          <v-layout column>
            <div class="body-1">Video Player</div>
            <div>
              <v-switch label="Autoplay" style="width: 120px" v-model="autoplay"></v-switch>
            </div>
          </v-layout>
        </div>
        <div class="outputs">{{ $td.autoplay }}</div>
      </v-layout>

      <!-- next -->
      <v-layout row>
        ...
      </v-layout>

    </form>

  </v-layout>
</template>

<script>
import { mapModelsToState } from 'vuex-bound';

export default {
  computed: {
    $td() {
      return this.$store.state.formControls.templateDriven;
    },
    ...mapModelsToState('formControls.templateDriven', [
      'nickname',
      'dessert',
      'states',
      'technologies',
      'gender',
      'autoplay',
    ])
  }
};
</script>

<style scoped>

.row {
  padding: .66rem;
  display: flex;
  flex-direction: row;
}

.field {
  max-width: 10rem;
}

.outputs {
  align-self: center;
  margin: 0 0 .5rem .5rem;
  color: #009688;
}
</style>
