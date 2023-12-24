<script lang="ts" setup>
import { XBreadcrumb, XCard, XPassword } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Password' }]" />

  <h1 class="text-4xl font-extrabold my-4">Password</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XPassword label="New Password" />
    </XCard>
  </section>
</template>
