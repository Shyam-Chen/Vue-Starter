<template>
  <v-container class="shell-container" fluid>
    <div class="headline">Machine Learning</div>

    <div>y = a * x ^ 2 + b * x + c</div>
    <v-btn @click="show(2)">Show</v-btn>
    <pre>{{ result }}</pre>
  </v-container>
</template>

<script>
import * as tf from '@tensorflow/tfjs';

// Define constants: y = 2x^2 + 4x + 8
const a = tf.scalar(2);
const b = tf.scalar(4);
const c = tf.scalar(8);

export default {
  data() {
    return {
      result: null,
    };
  },
  methods: {
    predict(input) {
      // y = a * x ^ 2 + b * x + c
      return tf.tidy(() => {
        const x = tf.scalar(input);

        const ax2 = a.mul(x.square());
        const bx = b.mul(x);
        const y = ax2.add(bx).add(c);

        return y;
      });
    },
    show(value) {
      this.result = this.predict(value);
    },
  },
};
</script>

<style scoped>
</style>
