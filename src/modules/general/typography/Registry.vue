<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'General', disabled: true },
      { text: 'Typography', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Typography</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="text-4xl">h1. Heading</div>
    <div class="text-3xl">h2. Heading</div>
    <div class="text-2xl">h3. Heading</div>
    <div class="text-xl">h4. Heading</div>
    <div>h5. Heading</div>
    <div>h6. Heading</div>

    <div>
      subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </div>

    <div>
      subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </div>

    <div>
      body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
      suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
      dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
    </div>

    <div>
      body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
      suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
      dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
    </div>
  </div>
</template>
