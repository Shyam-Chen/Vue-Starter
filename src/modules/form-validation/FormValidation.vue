<script setup>
import SignInForm from './SignInForm.vue';
import Table from './Table.vue';
import store from './store.js';

store();
</script>

<template>
  <SignInForm class="border p-4" />
  <Table class="border p-4" />
</template>
