<template>
  <div>
    <div class="text">
      <span class="md-title">
        Clicked: {{ $store.state.counter.value }} times, value is {{ evenOrOdd }}.
      </span>
    </div>

    <div>
      <md-button class="md-raised md-primary" @click="increment">Increment</md-button>
      <md-button class="md-raised md-primary" @click="decrement">Decrement</md-button>
      <md-button class="md-raised md-accent" @click="incrementAsync">Increment (Async)</md-button>
      <md-button class="md-raised md-accent" @click="incrementIfOdd">Increment (If Odd)</md-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ]),
  computed: mapGetters([
    'evenOrOdd'
  ])
};
</script>

<style scoped>
.text {
  padding: 1rem;
}
</style>
