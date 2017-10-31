<template>
  <div class="container">
    <Navigation />

    <md-whiteframe md-elevation="2">
      <form class="form">
        <div class="row input">
          <!-- input -->
          <md-input-container>
            <label>Nickname</label>
            <md-input v-model="nickname"></md-input>
          </md-input-container>
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
  display: flex;
  flex-direction: row;
}

.input {
  max-width: 10rem;
}
</style>
