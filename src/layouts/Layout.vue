<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Center from './Center.vue';
import Default from './Default.vue';

const route = useRoute();

const meta = computed(() => route.meta);
</script>

<template>
  <Center v-if="meta.layout === 'center'">
    <slot></slot>
  </Center>

  <Default v-else>
    <slot></slot>
  </Default>
</template>
