<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Chip from '~/components/Chip.vue';
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Chip' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Chip</div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-4">
    <div class="font-bold">Basic</div>

    <div class="flex flex-wrap justify-center items-center gap-4">
      <Chip>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (primary)</div>
      </Chip>

      <Chip color="secondary">
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (secondary)</div>
      </Chip>

      <Chip color="success">
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (success)</div>
      </Chip>

      <Chip color="warning">
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (warning)</div>
      </Chip>

      <Chip color="danger">
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (danger)</div>
      </Chip>

      <Chip color="info">
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (info)</div>
      </Chip>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-4">
      <Chip closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (primary)</div>
      </Chip>

      <Chip color="secondary" closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (secondary)</div>
      </Chip>

      <Chip color="success" closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (success)</div>
      </Chip>

      <Chip color="warning" closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (warning)</div>
      </Chip>

      <Chip color="danger" closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (danger)</div>
      </Chip>

      <Chip color="info" closable>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (info)</div>
      </Chip>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-4">
      <Chip disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (primary)</div>
      </Chip>

      <Chip color="secondary" disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (secondary)</div>
      </Chip>

      <Chip color="success" disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (success)</div>
      </Chip>

      <Chip color="warning" disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (warning)</div>
      </Chip>

      <Chip color="danger" disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (danger)</div>
      </Chip>

      <Chip color="info" disabled>
        <div class="w-4 h-4 i-fa-envelope"></div>
        <div class="ml-1">Mail (info)</div>
      </Chip>
    </div>
  </div>
</template>
