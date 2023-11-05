<script lang="ts" setup>
import { XAvatar } from '@x/ui';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Badge from '~/components/Badge.vue';
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Avatar' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Avatar</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center gap-2">
      <XAvatar src="https://mui.com/static/images/avatar/1.jpg" alt="Remy Sharp" />
      <XAvatar icon="i-mdi-account" class="bg-indigo-700 text-white" />
      <XAvatar class="bg-red-700 text-white">SC</XAvatar>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Grouped</div>

    <div class="flex justify-center">
      <XAvatar.Group :total="24">
        <XAvatar src="https://mui.com/static/images/avatar/1.jpg" alt="Remy Sharp" />
        <XAvatar src="https://mui.com/static/images/avatar/2.jpg" alt="Travis Howard" />
        <XAvatar src="https://mui.com/static/images/avatar/3.jpg" alt="Cindy Baker" />
        <XAvatar src="https://mui.com/static/images/avatar/4.jpg" alt="Agnes Walker" />
      </XAvatar.Group>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">With badge</div>

    <div class="flex justify-center">
      <Badge class="important:bg-green-500 top-auto right-1 -bottom-1 border">
        <XAvatar src="https://mui.com/static/images/avatar/1.jpg" alt="Remy Sharp" />
      </Badge>
    </div>
  </div>
</template>
