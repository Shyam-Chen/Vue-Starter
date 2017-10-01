<template>
  <div>
    <Navigation />

    <router-link to="/counter" tag="md-button" class="md-raised md-primary">Counter</router-link>
    <router-link to="/rest" tag="md-button" class="md-raised md-primary">REST</router-link>
  </div>
</template>

<script>
import Navigation from '../shared/Navigation';

export default {
  components: { Navigation }
};
</script>
