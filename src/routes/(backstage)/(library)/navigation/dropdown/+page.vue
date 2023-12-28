<script lang="ts" setup>
import { XBreadcrumb, XCard, XDropdown, XButton } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Dropdown' }]" />

  <h1 class="text-4xl font-extrabold my-4">Dropdown</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XDropdown :options="['Action', 'Another action', '', 'Something else here']">
        <XButton label="Button" />
      </XDropdown>
    </XCard>
  </section>

  <div class="h-72"></div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-between">
      <XDropdown :options="['Action', 'Another action', '', 'Something else here']">
        <XButton>Button</XButton>
      </XDropdown>

      <XDropdown :options="['Action', 'Another action', '', 'Something else here']">
        <XButton>Button</XButton>
      </XDropdown>

      <XDropdown :options="['Action', 'Another action', '', 'Something else here']">
        <XButton>Button</XButton>
      </XDropdown>

      <XDropdown :options="['Action', 'Another action', '', 'Something else here']">
        <XButton>Button</XButton>
      </XDropdown>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <XDropdown :options="['Action', 'Another action', '', 'Something else here']">
        <div class="w-20 h-20 bg-primary-500 rounded-lg"></div>
      </XDropdown>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center gap-6">
      <template v-for="num in 8" :key="num">
        <XDropdown :options="['Action', 'Another action', '', 'Something else here']">
          <div class="w-20 h-20 bg-primary-500 rounded-lg flex justify-center items-center">
            {{ num }}
          </div>
        </XDropdown>
      </template>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center gap-8">
      <XDropdown :options="['Action', 'Another action', '', 'Something else here']">
        <div class="w-50 h-50 bg-primary-500 rounded-lg"></div>
      </XDropdown>

      <XDropdown :options="['Action', 'Another action', '', 'Something else here']">
        <div class="w-50 h-50 bg-primary-500 rounded-lg"></div>
      </XDropdown>
    </div>
  </div>

  <div class="h-72"></div>
</template>
