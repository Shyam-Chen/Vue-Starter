<template>
  <div>
    Clicked: {{ $store.state.counter.value }} times, count is {{ evenOrOdd }}.
    <md-button class="md-primary" @click="increment">Increment</md-button>
    <md-button class="md-primary" @click="decrement">Decrement</md-button>
    <md-button class="md-accent" @click="incrementIfOdd">Increment if odd</md-button>
    <md-button class="md-accent" @click="incrementAsync">Increment async</md-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'counter',
  computed: mapGetters([
    'evenOrOdd'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
</script>
