<script lang="ts" setup>
import { XBreadcrumb, XCard, XCodeBlock } from '@x/ui';

const codeBasic = `<div class="i-material-symbols-notifications-rounded size-5 text-blue-500"></div>
<div class="i-material-symbols-notifications-rounded size-8 text-yellow-500"></div>`;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Icons' }]" />

  <h1 class="text-4xl font-extrabold my-4">Icons</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="flex justify-center items-center gap-4">
        <div class="i-material-symbols-notifications-rounded size-5 text-blue-500"></div>
        <div class="i-material-symbols-notifications-rounded size-8 text-yellow-500"></div>
      </div>
    </XCard>

    <XCodeBlock :code="codeBasic" language="html" />
  </section>
</template>
