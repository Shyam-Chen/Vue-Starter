<script lang="ts" setup>
import { RouterView } from 'vue-router';

import Baseline from '~/layouts/Baseline.vue';
import auth from '~/middleware/auth';

defineOptions({
  beforeRouteEnter: auth,
});
</script>

<template>
  <Baseline>
    <RouterView />
  </Baseline>
</template>
