<script lang="ts" setup>
import { XBreadcrumb, XCard, XListbox } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Listbox' }]" />

  <h1 class="text-4xl font-extrabold my-4">Listbox</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XListbox>
        <XListbox.Item class="flex items-center gap-2">
          <div class="i-material-symbols-arrow-circle-up-outline-rounded size-5"></div>
          <div>Top</div>
        </XListbox.Item>
        <XListbox.Item class="flex items-center gap-2">
          <div class="i-material-symbols-arrow-circle-right-outline-rounded size-5"></div>
          <div>Right</div>
        </XListbox.Item>
        <XListbox.Item class="flex items-center gap-2">
          <div class="i-material-symbols-arrow-circle-down-outline-rounded size-5"></div>
          <div>Bottom</div>
        </XListbox.Item>
        <XListbox.Item class="flex items-center gap-2">
          <div class="i-material-symbols-arrow-circle-left-outline-rounded size-5"></div>
          <div>Left</div>
        </XListbox.Item>
      </XListbox>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">...</h2>

    <XCard>
      <!-- ... -->
    </XCard>
  </section>
</template>
