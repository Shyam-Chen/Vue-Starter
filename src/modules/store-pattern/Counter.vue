<script setup>
import { useState, useActions, useComputeds, useReactions } from './store.js';

const state = useState();
const actions = useActions();
const computeds = useComputeds();
const reactions = useReactions();
</script>

<template>
  <div>Clicked: {{ state.count }} times, value is {{ computeds.evenOrOdd.value }}.</div>
  <dir>{{ state.prevCount }}</dir>

  <button
    class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
    @click="actions.increment"
  >
    Increment
  </button>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
    @click="actions.decrement"
  >
    Decrement
  </button>
</template>
