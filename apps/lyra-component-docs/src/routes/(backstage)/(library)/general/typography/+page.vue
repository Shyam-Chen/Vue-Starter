<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@lyra/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Typography' }]" />

  <h1 class="text-4xl font-extrabold my-4">Typography</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <h1 class="text-4xl font-extrabold">h1. Heading</h1>
      <h2 class="text-3xl font-bold">h2. Heading</h2>
      <h3 class="text-2xl font-semibold">h3. Heading</h3>
      <h4 class="text-xl font-medium">h4. Heading</h4>

      <p>
        p. Paragraph Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
        tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
        numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </p>
    </XCard>
  </section>
</template>
