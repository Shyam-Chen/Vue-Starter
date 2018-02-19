<template>
  <div>
    <div v-if="location === '/form-controls'">
      <router-link to="/form-controls/template-driven" name="templateDriven" tag="md-button" class="md-raised md-primary">Template-driven</router-link>
      <router-link to="/form-controls/reactive-forms" name="reactiveForms" tag="md-button" class="md-raised md-primary">Reactive Forms</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { TemplateDriven } from './template-driven';
import { ReactiveForms } from './reactive-forms';

export default {
  data() {
    return {
      location: location.pathname
    }
  },
  components: {
    TemplateDriven,
    ReactiveForms
  }
};
</script>

<style scoped>
</style>
