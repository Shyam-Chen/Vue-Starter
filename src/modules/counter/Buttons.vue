<script setup>
import { useActions } from './store.js';

const actions = useActions();
</script>

<template>
  <button @click="actions.increment">Increment</button>
  <button @click="actions.decrement">Decrement</button>
</template>
