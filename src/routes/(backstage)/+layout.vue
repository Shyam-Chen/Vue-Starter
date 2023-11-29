<script lang="ts" setup>
import { RouterView } from 'vue-router';

import { Baseline } from '~/layouts/baseline';
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
