<script setup>
import { defineProps, reactive } from 'vue';

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });
</script>

<template>
  <h3>CRUD Operations</h3>
  <div>...</div>
</template>
