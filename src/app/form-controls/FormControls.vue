<template>
  <div class="container">
    <Navigation />

    <router-link to="/form-controls/template-driven" name="templateDriven" tag="md-button" class="md-raised md-accent">Template-driven</router-link>
    <router-link to="/form-controls/reactive-forms" name="reactiveForms" tag="md-button" class="md-raised md-accent">Reactive Forms</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '~/shared/Navigation';

import { TemplateDriven } from './template-driven';
import { ReactiveForms } from './reactive-forms';

export default {
  components: {
    Navigation,

    TemplateDriven,
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
