<template>
  <div class="container">
    <Navigation />

    <md-whiteframe md-elevation="2">
      <form class="form">
        <div class="row">
          <!-- input -->
          <md-input-container class="input">
            <label>Nickname</label>
            <md-input v-model="$store.state.formControls.nickname"></md-input>
          </md-input-container>
          <div class="outputs">
            {{ $store.state.formControls.nickname }}
          </div>
        </div>

        <div class="row">
          <div>
            <div class="md-body-2">Gender</div>
            <md-radio v-model="$store.state.formControls.gender" name="gender" md-value="Male">Male</md-radio>
            <md-radio v-model="$store.state.formControls.gender" name="gender" md-value="Female">Female</md-radio>
            <md-radio v-model="$store.state.formControls.gender" name="gender" md-value="Other">Other</md-radio>
          </div>
          <div class="outputs" style="padding-top: 2rem">
            {{ $store.state.formControls.gender }}
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
    </md-whiteframe>

  </div>
</template>

<script>
import Navigation from '~/shared/Navigation';

export default {
  computed: {
    autoplay: {
      get() { return this.$store.state.formControls.autoplay; },
      set(autoplay) { this.$store.commit('autoplay', { autoplay }) }
    }
  },
  components: { Navigation }
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

.input {
  max-width: 10rem;
}

.outputs {
  align-self: center;
  margin: 0 0 .5rem .5rem;
  color: #009688;
}
</style>
