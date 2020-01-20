<template>
  <div>
    <v-btn class="ml-0" @click="increment">Increment</v-btn>
    <div>Count: {{ mutableCount }}</div>
  </div>
</template>

<script>
// @flow

type Data = {
  mutableCount: number,
};

export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  data(): Data {
    return {
      mutableCount: this.count,
    };
  },
  methods: {
    increment(): void {
      this.mutableCount += 1;
      this.$emit('countChange', this.mutableCount);
    },
  },
};
</script>
