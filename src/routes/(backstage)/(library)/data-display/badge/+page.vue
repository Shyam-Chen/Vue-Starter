<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Badge from '~/components/Badge.vue';
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Badge' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Badge</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center items-center gap-15">
      <Badge>
        <div class="w-6 h-6 i-fa-envelope"></div>
      </Badge>

      <Badge count="7">
        <div class="w-6 h-6 i-fa-envelope"></div>
      </Badge>

      <Badge count="77">
        <div class="w-6 h-6 i-fa-envelope"></div>
      </Badge>

      <Badge count="99+">
        <div class="w-6 h-6 i-fa-envelope"></div>
      </Badge>
    </div>

    <div class="flex justify-center items-center gap-15 mt-6">
      <Badge>
        <div>Link something</div>
      </Badge>
    </div>
  </div>
</template>
