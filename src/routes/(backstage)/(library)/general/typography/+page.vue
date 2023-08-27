<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Typography' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Typography</div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-2">
    <div class="mb-2">Basic</div>

    <div class="text-5xl font-bold">h1. Heading</div>
    <div class="text-4xl font-bold">h2. Heading</div>
    <div class="text-3xl font-bold">h3. Heading</div>
    <div class="text-2xl font-bold">h4. Heading</div>
    <div class="text-xl font-bold">h5. Heading</div>
    <div class="text-lg font-bold">h6. Heading</div>

    <div class="font-medium">
      subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </div>

    <div class="text-sm font-medium">
      subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </div>

    <div>
      body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
      suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
      dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
    </div>

    <div class="text-sm">
      body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
      suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
      dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
    </div>
  </div>
</template>
