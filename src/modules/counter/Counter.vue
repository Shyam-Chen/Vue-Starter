<script setup>
import Display from './Display.vue';
import Buttons from './Buttons.vue';
import store from './store.js';

store();
</script>

<template>
  <Display />
  <Buttons />
</template>
