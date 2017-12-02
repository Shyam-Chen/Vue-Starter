<template>
  <div class="container">
    <Navigation />

    <md-content>
      <p class="md-title">Clicked: {{ $store.state.counter.value }} times, value is {{ evenOrOdd }}.</p>
    </md-content>

    <div>
      <md-button class="md-raised md-primary" @click="increment">Increment</md-button>
      <md-button class="md-raised md-primary" @click="decrement">Decrement</md-button>
      <md-button class="md-raised md-accent" @click="incrementAsync">Increment (Async)</md-button>
      <md-button class="md-raised md-accent" @click="decrementAsync">Decrement (Async)</md-button>
      <md-button class="md-raised md-accent" @click="incrementIfOdd">Increment (If Odd)</md-button>
      <md-button class="md-raised md-accent" @click="decrementIfEven">Decrement (If Even)</md-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Navigation from '~/shared/Navigation';

export default {
  methods: mapActions([
    'increment',
    'decrement',
    'incrementAsync',
    'decrementAsync',
    'incrementIfOdd',
    'decrementIfEven'
  ]),
  computed: mapGetters([
    'evenOrOdd'
  ]),
  components: { Navigation }
};
</script>

<style scoped>
.container {
  background: #FAFAFA;
  height: 100vh;
  padding: 1rem;
}
</style>
