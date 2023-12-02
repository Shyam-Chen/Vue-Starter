<script lang="ts" setup>
import { XBreadcrumb, XPassword } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Password' }]" />

  <div class="my-4">
    <div class="text-4xl font-extrabold">Password</div>
  </div>

  <XPassword label="New Password" />
</template>
