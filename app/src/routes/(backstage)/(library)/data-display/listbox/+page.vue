<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XCard, XListbox } from '@x/ui';

const selected = ref('right');
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Listbox' }]" />

  <h1 class="text-4xl font-extrabold my-4">Listbox</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XListbox>
        <XListbox.Item
          prepend="i-material-symbols-arrow-circle-up-outline-rounded"
          append="i-material-symbols-chevron-right-rounded"
        >
          Top
        </XListbox.Item>
        <XListbox.Item prepend="i-material-symbols-arrow-circle-right-outline-rounded">
          Right
        </XListbox.Item>
        <XListbox.Item prepend>Bottom</XListbox.Item>
        <XListbox.Item prepend append="i-material-symbols-chevron-right-rounded">
          Left
        </XListbox.Item>
      </XListbox>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Checkmark</h2>

    <XCard>
      <XListbox>
        <XListbox.Item
          :prepend="selected === 'top' ? 'i-material-symbols-check-small-rounded' : true"
          @click="selected = 'top'"
        >
          Top
        </XListbox.Item>
        <XListbox.Item
          :prepend="selected === 'right' ? 'i-material-symbols-check-small-rounded' : true"
          @click="selected = 'right'"
        >
          Right
        </XListbox.Item>
        <XListbox.Item
          :prepend="selected === 'bottom' ? 'i-material-symbols-check-small-rounded' : true"
          @click="selected = 'bottom'"
        >
          Bottom
        </XListbox.Item>
        <XListbox.Item
          :prepend="selected === 'left' ? 'i-material-symbols-check-small-rounded' : true"
          @click="selected = 'left'"
        >
          Left
        </XListbox.Item>
      </XListbox>
    </XCard>
  </section>
</template>
