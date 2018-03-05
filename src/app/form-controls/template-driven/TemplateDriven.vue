<template>
  <div>
    <h1>Template-driven</h1>

    <div class="md-elevation-2">
      <form class="form">
        <div class="row">
          <!-- input -->
          <div>
            <v-text-field name="nickname" label="Nickname" v-model="nickname"></v-text-field>
          </div>

          <div class="outputs">
            {{ $td.nickname }}
          </div>
        </div>

        <div class="row">
          <!-- select -->
          <div>
            <v-select :items="$td.dessertList" v-model="dessert" label="Dessert" style="width: 167px" single-line bottom></v-select>
          </div>

          <div class="outputs">
            {{ $td.dessert }}
          </div>
        </div>

        <div class="row">
          <!-- multiple select -->
          <div>
            <v-select :items="$td.statesList" v-model="states" label="States" style="width: 300px" multiple chips single-line bottom></v-select>
          </div>

          <div class="outputs">
            {{ $td.states }}
          </div>
        </div>

        <div class="row">
          <!-- checkboxes -->
          <div>
            <v-layout row wrap>
              <v-checkbox style="width: 10rem" v-for="item in $td.technologiesList" :key="item" :label="item" :value="item" v-model="technologies"></v-checkbox>
            </v-layout>
          </div>

          <div class="outputs">
            {{ $td.technologies }}
          </div>
        </div>

        <div class="row">
          <!-- radios -->
          <div>
            <v-radio-group row style="width: 300px" v-model="gender">
              <v-radio v-for="item in $td.genderList" :key="item" :label="item" :value="item"></v-radio>
            </v-radio-group>
          </div>

          <div class="outputs">
            {{ $td.gender }}
          </div>
        </div>

        <div class="row">
          <!-- switch -->
          <div>
            <v-switch label="Autoplay" style="width: 120px" v-model="autoplay"></v-switch>
          </div>

          <div class="outputs">
            {{ $td.autoplay }}
          </div>
        </div>

        <div class="row">
          ...
        </div>
      </form>
    </div>
  </div>
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
.form {
  padding: 1rem;
  background: #FFFFFF;
}

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
