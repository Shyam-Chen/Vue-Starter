<template>
  <div>
    <div class="title">
      <p class="md-title">
        Clicked: <span class="title--highlight">{{ $c.value }}</span> times, value is <span class="title--highlight">{{ evenOrOdd }}</span>.
      </p>
    </div>

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
  }
};
</script>

<style scoped>
.title {
  padding: 0 .5rem;

  /* BUG: vue-jest, https://github.com/vuejs/vue-jest/issues/51 */
  /* &--highlight {
    font-weight: bold;
  } */
}
</style>
