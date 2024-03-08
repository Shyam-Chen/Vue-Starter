<script lang="ts" setup>
import { XBreadcrumb, XCard, XTimeline, XButton } from '@lyra/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Timeline' }]" />

  <h1 class="text-4xl font-extrabold my-4">Timeline</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XTimeline>
        <XTimeline.Item title="Application UI code in Tailwind CSS" date="February 2022">
          <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Get access to over 20+ pages including a dashboard layout, charts, kanban board,
            calendar, and pre-order E-commerce & Marketing pages.
          </p>

          <XButton variant="outlined" color="secondary">
            Learn more
            <div class="i-mdi-arrow-right w-5 h-5"></div>
          </XButton>
        </XTimeline.Item>

        <XTimeline.Item title="Application UI code in Tailwind CSS" date="March 2022">
          <p class="text-base font-normal text-gray-500 dark:text-gray-400">
            All of the pages and components are first designed in Figma and we keep a parity between
            the two versions even as we update the project.
          </p>
        </XTimeline.Item>

        <XTimeline.Item title="Application UI code in Tailwind CSS" date="April 2022">
          <p class="text-base font-normal text-gray-500 dark:text-gray-400">
            Get started with dozens of web components and interactive elements built on top of
            Tailwind CSS.
          </p>
        </XTimeline.Item>
      </XTimeline>
    </XCard>
  </section>
</template>
