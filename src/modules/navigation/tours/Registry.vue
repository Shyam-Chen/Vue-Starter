<script lang="ts" setup>
import { ref } from 'vue';
import Breadcrumbs from '~/components/Breadcrumbs.vue';
// import Button from '~/components/Button.vue';

const el1 = ref();
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Navigation', disabled: true },
      { text: 'Tours', disabled: true },
    ]"
    class="mb-4"
  />

  <div
    class="fixed z-101 pointer-events-none"
    style="
      width: 960px;
      height: 36px;
      left: 288px;
      top: 152px;
      box-shadow: rgba(33, 33, 33, 0.5) 0 0 0 3333px;
    "
  ></div>

  <div class="mb-4">
    <div ref="el1" class="text-3xl font-bold">Tours</div>
  </div>
</template>
