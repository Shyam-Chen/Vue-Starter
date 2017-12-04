<template>
  <div class="container">
    <h1>Basic Forms</h1>

    <md-content class="md-elevation-2">
      <form class="form">
        <div class="row">
          <!-- input -->
          <md-field class="field">
            <label>Nickname</label>
            <md-input v-model="$store.state.formControls.basicForms.nickname"></md-input>
          </md-field>
          <div class="outputs">
            {{ $store.state.formControls.basicForms.nickname }}
          </div>
        </div>

        <div class="row">
          <!-- select -->
          <md-field class="field">
            <label for="age">Age</label>
            <md-select v-model="$store.state.formControls.basicForms.age" name="age" id="age">
              <!-- <md-option value=""><em>None</em></md-option> -->
              <md-option :key="item.value" :value="item.value" v-for="item in $store.state.formControls.basicForms.listOfage">
                {{ item.label }}
              </md-option>
            </md-select>
          </md-field>
          <div class="outputs">
            {{ $store.state.formControls.basicForms.age }}
          </div>
        </div>

        <div class="row">
          <div>
            <div class="md-body-2">Gender</div>
            <md-radio v-model="$store.state.formControls.basicForms.gender" value="Male">Male</md-radio>
            <md-radio v-model="$store.state.formControls.basicForms.gender" value="Female">Female</md-radio>
            <md-radio v-model="$store.state.formControls.basicForms.gender" value="Other">Other</md-radio>
          </div>
          <div class="outputs" style="padding-top: 2rem">
            {{ $store.state.formControls.basicForms.gender }}
          </div>
        </div>

        <div class="row">
          <div class="md-body-2" style="align-self: center">Autoplay</div>
          <div style="margin-left: 1rem">
            <md-switch v-model="autoplay" name="autoplay"></md-switch>
          </div>
          <div class="outputs" style="padding-top: .5rem">
            {{ autoplay ? `${autoplay}`.charAt(0).toUpperCase() + `${autoplay}`.slice(1) : '' }}
          </div>
        </div>

        <div class="row">
          ...
        </div>
      </form>
    </md-content>
  </div>
</template>

<script>
export default {
  computed: {
    autoplay: {
      get() { return this.$store.state.formControls.basicForms.autoplay; },
      set(autoplay) { this.$store.commit('autoplay', { autoplay }); }
    }
  },
};
</script>

<style scoped>
.container {
  background: #FAFAFA;
  height: 100vh;
  padding: 1rem;
}

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
