<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Card from '~/components/Card.vue';
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Card' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Card</div>
  </div>

  <Card />
</template>
