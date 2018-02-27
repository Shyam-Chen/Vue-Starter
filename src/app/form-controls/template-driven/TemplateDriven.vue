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
            <v-select :items="$td.listOfage" v-model="age" label="Age" style="width: 167px" single-line bottom></v-select>
          </div>

          <div class="outputs">
            {{ $td.age }}
          </div>
        </div>

        <div class="row">
          <!-- Radios -->
          <div class="">
            <v-radio-group row style="width: 300px" v-model="gender">
              <v-radio v-for="item in ['Male', 'Female',' Other']" :key="item" :label="item" :value="item"></v-radio>
            </v-radio-group>
          </div>

          <div class="outputs">
            {{ $td.gender }}
          </div>
        </div>

        <div class="row">
          <div>
            <v-switch label="Autoplay" style="width: 120px" v-model="autoplay"></v-switch>
          </div>

          <div class="outputs" style="text-transform: capitalize">
            {{ $td.autoplay ? $td.autoplay : '' }}
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
      'age',
      'gender',
      'autoplay'
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
