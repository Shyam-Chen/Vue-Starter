<template>
  <div>
    <div class="text">
      <span class="md-title">
        Clicked: {{ $store.state.counter.value }} times, count is {{ evenOrOdd }}.
      </span>
    </div>

    <div>
      <md-button class="md-raised md-primary" @click="increment">Increment</md-button>
      <md-button class="md-raised md-primary" @click="decrement">Decrement</md-button>
      <md-button class="md-raised md-accent" @click="incrementIfOdd">Increment if odd</md-button>
      <md-button class="md-raised md-accent" @click="incrementAsync">Increment async</md-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  // name: 'counter',
  computed: mapGetters([
    'evenOrOdd'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
};
</script>

<style scoped>
.text {
  padding: 1rem;
}
</style>
