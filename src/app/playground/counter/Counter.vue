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
          <md-button class="md-raised md-primary" onClick={this.increment}>Increment</md-button>
          <md-button class="md-raised md-primary" onClick={this.decrement}>Decrement</md-button>
        </div>

        <div>
          <md-button class="md-raised md-primary" onClick={this.incrementAsync}>Increment (Async)</md-button>
          <md-button class="md-raised md-primary" onClick={this.decrementAsync}>Decrement (Async)</md-button>
          <md-button class="md-raised md-primary" onClick={this.incrementIfOdd}>Increment (If Odd)</md-button>
          <md-button class="md-raised md-primary" onClick={this.decrementIfEven}>Decrement (If Even)</md-button>
        </div>

        <div>
          <md-button class="md-raised md-primary">Start Count</md-button>
          <md-button class="md-raised md-primary">Cancel Count</md-button>
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
