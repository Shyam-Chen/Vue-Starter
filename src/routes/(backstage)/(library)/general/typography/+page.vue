<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Typography' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Typography</div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-2">
    <div class="mb-2">Basic</div>

    <h1 class="text-4xl font-extrabold">h1. Heading</h1>
    <h2 class="text-3xl font-bold">h2. Heading</h2>
    <h3 class="text-2xl font-semibold">h3. Heading</h3>
    <h4 class="text-xl font-medium">h4. Heading</h4>

    <p>
      p. Paragraph Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
      dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
    </p>
  </div>
</template>
