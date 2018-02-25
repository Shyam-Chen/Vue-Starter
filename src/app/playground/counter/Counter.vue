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
      <div>
        <div class="title">
          <p class="md-title">
            Clicked: <span class="title--highlight">{this.$c.value}</span> times, value is <span class="title--highlight">{this.evenOrOdd}</span>.
          </p>
        </div>

        <div>
          <v-btn color="info" onClick={this.increment}>Increment</v-btn>
          <v-btn color="info" onClick={this.decrement}>Decrement</v-btn>
        </div>

        <div>
          <v-btn color="info" onClick={this.incrementAsync}>Increment (Async)</v-btn>
          <v-btn color="info" onClick={this.decrementAsync}>Decrement (Async)</v-btn>
          <v-btn color="info" onClick={this.incrementIfOdd}>Increment (If Odd)</v-btn>
          <v-btn color="info" onClick={this.decrementIfEven}>Decrement (If Even)</v-btn>
        </div>

        <div>
          <v-btn color="info">Start Count</v-btn>
          <v-btn color="info">Cancel Count</v-btn>
        </div>
      </div>
    );
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
