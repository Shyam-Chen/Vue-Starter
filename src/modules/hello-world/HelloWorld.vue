<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';

// const store = useStore();

// store.registerModule('helloWorld', {
//   namespaced: true,
// });

const state = reactive({ count: 0 });
</script>

<template>
  <div>{{ state.count }}</div>
</template>
