<script lang="ts" setup>
import provider from './provider';
import Consumer from './Consumer.vue';

defineRegistry({
  layout: 'Center',
});

provider();
</script>

<template>
  <Consumer />
</template>
