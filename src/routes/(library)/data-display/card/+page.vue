<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Card from '~/components/Card.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Display', disabled: true },
      { text: 'Card', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Card</div>
  </div>

  <Card />
</template>
