<template>
  <div class="container">
    <Navigation />

    <router-link to="/form-controls/basic-forms" name="basicForms" tag="md-button" class="md-raised md-accent">Basic Forms</router-link>
    <router-link to="/form-controls/reactive-forms" name="reactiveForms" tag="md-button" class="md-raised md-accent">Reactive Forms</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '~/shared/Navigation';

import BasicForms from './BasicForms';
import ReactiveForms from './ReactiveForms';

export default {
  components: {
    Navigation,

    BasicForms,
    ReactiveForms
  }
};
</script>

<style scoped>
.container {
  background: #FAFAFA;
  height: 100vh;
  padding: 1rem;
}
</style>
