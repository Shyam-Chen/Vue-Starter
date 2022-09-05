<script lang="ts" setup>
import { reactive } from 'vue';

const state = reactive({
  count: 0,
});

const actions = reactive({
  inc() {
    state.count += 1;
  },
});

console.log(import.meta.env);
</script>

<template>
  <div>Test</div>
  <div>{{ state.count }}</div>
  <button @click="actions.inc">Inc</button>
  <router-view></router-view>
  <!-- <Layout>
    <router-view></router-view>
  </Layout> -->
</template>
