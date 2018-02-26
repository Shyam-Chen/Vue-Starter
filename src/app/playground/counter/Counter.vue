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
  },
  render() {
    return (
      <v-layout row wrap>
        <v-flex xs12>
          <div class="headline">
            Clicked: <strong>{this.$c.value}</strong> times,
            value is <strong>{this.evenOrOdd}</strong>.
          </div>
        </v-flex>

        <v-flex xs12>
          <v-btn color="primary" onClick={this.increment}>Increment</v-btn>
          <v-btn color="primary" onClick={this.decrement}>Decrement</v-btn>
        </v-flex>

        <v-flex xs12>
          <v-btn color="primary" onClick={this.incrementAsync}>Increment (Async)</v-btn>
          <v-btn color="primary" onClick={this.decrementAsync}>Decrement (Async)</v-btn>
          <v-btn color="primary" onClick={this.incrementIfOdd}>Increment (If Odd)</v-btn>
          <v-btn color="primary" onClick={this.decrementIfEven}>Decrement (If Even)</v-btn>
        </v-flex>

        <v-flex xs12>
          <v-btn color="primary" disabled>Start Count</v-btn>
          <v-btn color="primary" disabled>Cancel Count</v-btn>
        </v-flex>
      </v-layout>
    );
  }
};
</script>

<style scoped>
.headline {
  padding: .5rem;
}
</style>
