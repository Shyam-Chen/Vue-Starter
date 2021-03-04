<script setup>
import { useStore } from 'vuex'

import Layout from '~/components/layout/Layout.vue';

const i18n = useStore()

i18n.dispatch('initialLanguage')
</script>

<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>
