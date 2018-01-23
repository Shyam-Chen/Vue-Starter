<template>
  <div class="container">
    <Navigation />

    <md-content>
      <p class="md-title">Clicked: {{ $c.value }} times, value is {{ evenOrOdd }}.</p>
    </md-content>

    <div>
      <md-button class="md-raised md-primary" @click="increment">Increment</md-button>
      <md-button class="md-raised md-primary" @click="decrement">Decrement</md-button>
    </div>

    <div>
      <md-button class="md-raised md-primary" @click="incrementAsync">Increment (Async)</md-button>
      <md-button class="md-raised md-primary" @click="decrementAsync">Decrement (Async)</md-button>
      <md-button class="md-raised md-primary" @click="incrementIfOdd">Increment (If Odd)</md-button>
      <md-button class="md-raised md-primary" @click="decrementIfEven">Decrement (If Even)</md-button>
    </div>

    <div>
      <md-button class="md-raised md-primary">Start Count</md-button>
      <md-button class="md-raised md-primary">Cancel Count</md-button>
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
  computed: {
    $c() {
      return this.$store.state.counter;
    },
    ...mapGetters(['evenOrOdd'])
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
</style>
