<script lang="ts" setup>
import Layout from '~/layouts/Layout.vue';
</script>

<template>
  <Layout>
    <RouterView></RouterView>
  </Layout>
</template>

<style lang="scss">
body {
  background: #f1f4f9;
}

.highcharts-credits {
  display: none !important;
}
</style>
