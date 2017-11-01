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
            <div>Gender</div>
            <md-radio v-model="$store.state.formControls.gender" name="gender" md-value="Male">Male</md-radio>
            <md-radio v-model="$store.state.formControls.gender" name="gender" md-value="Female">Female</md-radio>
            <md-radio v-model="$store.state.formControls.gender" name="gender" md-value="Other">Other</md-radio>
          </div>
          <div class="outputs">
            {{ $store.state.formControls.gender }}
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
