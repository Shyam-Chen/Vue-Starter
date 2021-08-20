<script setup>
import { useState, useComputeds } from './store.js';

const state = useState();
const computeds = useComputeds();
</script>

<template>
  <div>Clicked: {{ state.count }} times, value is {{ computeds.evenOrOdd.value }}.</div>
</template>
