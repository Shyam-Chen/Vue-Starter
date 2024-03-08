<script lang="ts" setup>
import { XBreadcrumb, XCard, XCode } from '@lyra/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Layout' }, { text: 'Aspect Ratio' }]" />

  <h1 class="text-4xl font-extrabold my-4">Aspect Ratio</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 flex items-center gap-2">
      Video
      <XCode>aspect-video</XCode>
    </h2>

    <XCard>
      <iframe
        src="https://www.youtube.com/embed/QhBnZ6NPOY0"
        title="Naruto"
        allowfullscreen
        class="w-full max-w-140 aspect-video"
      ></iframe>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6 flex items-center gap-2">
      4 by 3
      <XCode>aspect-4/3</XCode>
    </h2>

    <XCard>
      <img
        src="https://bit.ly/naruto-sage"
        alt="Naruto"
        class="w-full max-w-100 object-cover aspect-4/3"
      />
    </XCard>
  </section>
</template>
