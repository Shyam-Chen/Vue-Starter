<script lang="ts" setup>
import { ref } from 'vue';

const text = ref(404);
</script>

<template>
  <div class="text">{{ text }}</div>
</template>

<style lang="scss" scoped>
.text {
  font-size: 5rem;
  color: aqua;
}
</style>
