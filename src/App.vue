<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Layout from '~/layouts/Layout.vue';

const route = useRoute();

const meta = computed(() => route.meta);
</script>

<template>
  <template v-if="meta.error">
    <router-view></router-view>
  </template>

  <Layout v-else>
    <router-view></router-view>
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
