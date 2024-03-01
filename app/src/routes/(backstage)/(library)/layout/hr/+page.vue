<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Layout' }, { text: 'HR' }]" />

  <h1 class="text-4xl font-extrabold my-4">HR</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Icon</h2>

    <XCard>
      <p class="text-gray-500 dark:text-gray-400">
        Track work across the enterprise through an open, collaborative platform. Link issues across
        Jira and ingest data from other software development tools, so your IT support and
        operations teams have richer contextual information to rapidly respond to requests,
        incidents, and changes.
      </p>

      <div class="relative inline-flex items-center justify-center w-full">
        <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />

        <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-800">
          <div class="i-bi-quote w-5 h-5 text-gray-700 dark:text-gray-300"></div>
        </div>
      </div>

      <p class="text-gray-500 dark:text-gray-400">
        Deliver great service experiences fast - without the complexity of traditional ITSM
        solutions.Accelerate critical development work, eliminate toil.
      </p>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Text</h2>

    <XCard>
      <p class="text-gray-500 dark:text-gray-400">
        Track work across the enterprise through an open, collaborative platform. Link issues across
        Jira and ingest data from other software development tools, so your IT support and
        operations teams have richer contextual information to rapidly respond to requests,
        incidents, and changes.
      </p>

      <div class="relative inline-flex items-center justify-center w-full">
        <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        <span class="absolute px-3 font-medium -translate-x-1/2 bg-white left-1/2 dark:bg-gray-800"
          >or</span
        >
      </div>

      <p class="text-gray-500 dark:text-gray-400">
        Deliver great service experiences fast - without the complexity of traditional ITSM
        solutions.Accelerate critical development work, eliminate toil.
      </p>
    </XCard>
  </section>
</template>
