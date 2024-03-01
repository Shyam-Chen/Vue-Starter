<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XCard, XPassword } from '@x/ui';

const password = ref('oxlint');
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Password' }]" />

  <h1 class="text-4xl font-extrabold my-4">Password</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XPassword v-model:value="password" label="Password" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Meter</h2>

    <XCard>
      <XPassword v-model:value="password" label="New Password" meter />
    </XCard>
  </section>
</template>
