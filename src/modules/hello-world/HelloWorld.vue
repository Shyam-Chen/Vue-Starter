<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';

// import state from './'

const store = useStore();
console.log(store.state);

// store.registerModule('helloWorld', {
//   namespaced: true,
// });

const state = reactive({ count: 0 });
</script>

<template>
  <div>{{ state.count }}</div>
</template>
