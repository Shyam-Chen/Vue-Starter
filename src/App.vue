<script setup>
import { useLocaler } from 'vue-localer';

import Layout from '~/components/layout/Layout.vue';

const localer = useLocaler();

localer.dispatch('initialLanguage');
</script>

<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>
