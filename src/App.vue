<script lang="ts" setup>
import { RouterView } from 'vue-router';

import Layout from '~/layouts/Layout.vue';
</script>

<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<style>
.highcharts-credits {
  display: none;
}
</style>
