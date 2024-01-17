<script lang="ts" setup>
import { XBreadcrumb, XCard, XAvatar, XBadge } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Avatar' }]" />

  <h1 class="text-4xl font-extrabold my-4">Avatar</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="flex justify-center gap-4">
        <XAvatar src="https://mui.com/static/images/avatar/1.jpg" alt="Remy Sharp" />
        <XAvatar icon="i-mdi-account" class="bg-indigo-700 text-white" />
        <XAvatar class="bg-red-700 text-white">SC</XAvatar>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Grouped</h2>

    <XCard>
      <XAvatar.Group :total="24">
        <XAvatar src="https://mui.com/static/images/avatar/1.jpg" alt="Remy Sharp" />
        <XAvatar src="https://mui.com/static/images/avatar/2.jpg" alt="Travis Howard" />
        <XAvatar src="https://mui.com/static/images/avatar/3.jpg" alt="Cindy Baker" />
        <XAvatar src="https://mui.com/static/images/avatar/4.jpg" alt="Agnes Walker" />
      </XAvatar.Group>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">With badge</h2>

    <XCard>
      <div class="flex">
        <XBadge class="!bg-green-500 top-auto right-1 -bottom-1 border">
          <XAvatar src="https://mui.com/static/images/avatar/1.jpg" alt="Remy Sharp" />
        </XBadge>
      </div>
    </XCard>
  </section>
</template>
