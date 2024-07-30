<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="capitalize">{{ route.params.tab }} Content</div>
</template>
