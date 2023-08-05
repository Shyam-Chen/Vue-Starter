<script lang="ts" setup>
import { RouterView } from 'vue-router';

import Default from '~/layouts/Default.vue';
import auth from '~/middleware/auth';

defineOptions({
  beforeRouteEnter: auth,
});
</script>

<template>
  <Default>
    <RouterView />
  </Default>
</template>
