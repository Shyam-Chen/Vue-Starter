<script lang="ts" setup>
import Layout from '~/core/Layout.vue';

console.log('process.env.API_URL =', process.env.API_URL);
</script>

<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>
