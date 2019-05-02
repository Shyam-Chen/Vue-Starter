<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div class="headline mb-1">Custom Events</div>

      <Counter :count="10" @countChange="countChange" />
    </v-layout>
  </v-container>
</template>

<script>
import Counter from './Counter';

export default {
  components: {
    Counter,
  },
  methods: {
    countChange(currentCount) {
      console.log('[*] Count changed');
      console.log('[*] Current count:', currentCount);
    },
  },
};
</script>

<style scoped>
</style>
