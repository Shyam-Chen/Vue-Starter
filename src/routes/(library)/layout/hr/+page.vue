<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Layout', disabled: true },
      { text: 'HR', disabled: true },
    ]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">HR</div>
  </div>

  <div class="mt-4 mb-6">
    <div class="text-xl font-bold mb-2">Default HR</div>

    <div class="w-full p-4 border border-gray-200 rounded-xl dark:border-gray-600">
      <p class="text-gray-500 dark:text-gray-400">
        Track work across the enterprise through an open, collaborative platform. Link issues across
        Jira and ingest data from other software development tools, so your IT support and
        operations teams have richer contextual information to rapidly respond to requests,
        incidents, and changes.
      </p>

      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <p class="text-gray-500 dark:text-gray-400">
        Deliver great service experiences fast - without the complexity of traditional ITSM
        solutions.Accelerate critical development work, eliminate toil, and deploy changes with
        ease, with a complete audit trail for every change.
      </p>
    </div>
  </div>

  <div class="mt-4 mb-6">
    <div class="text-xl font-bold mb-2">Icon HR</div>

    <div class="w-full p-4 border border-gray-200 rounded-xl dark:border-gray-600">
      <p class="text-gray-500 dark:text-gray-400">
        Track work across the enterprise through an open, collaborative platform. Link issues across
        Jira and ingest data from other software development tools, so your IT support and
        operations teams have richer contextual information to rapidly respond to requests,
        incidents, and changes.
      </p>

      <div class="relative inline-flex items-center justify-center w-full">
        <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />

        <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
          <div class="i-bi-quote w-5 h-5 text-gray-700 dark:text-gray-300"></div>
        </div>
      </div>

      <p class="text-gray-500 dark:text-gray-400">
        Deliver great service experiences fast - without the complexity of traditional ITSM
        solutions.Accelerate critical development work, eliminate toil.
      </p>
    </div>
  </div>

  <div class="mt-4 mb-6">
    <div class="text-xl font-bold mb-2">HR with text</div>

    <div class="w-full p-4 border border-gray-200 rounded-xl dark:border-gray-600">
      <p class="text-gray-500 dark:text-gray-400">
        Track work across the enterprise through an open, collaborative platform. Link issues across
        Jira and ingest data from other software development tools, so your IT support and
        operations teams have richer contextual information to rapidly respond to requests,
        incidents, and changes.
      </p>

      <div class="relative inline-flex items-center justify-center w-full">
        <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        <span
          class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900"
          >or</span
        >
      </div>

      <p class="text-gray-500 dark:text-gray-400">
        Deliver great service experiences fast - without the complexity of traditional ITSM
        solutions.Accelerate critical development work, eliminate toil.
      </p>
    </div>
  </div>
</template>
