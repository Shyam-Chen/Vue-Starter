<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Dropdown from '~/components/Dropdown.vue';
import Button from '~/components/Button.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Navigation', disabled: true },
      { text: 'Dropdown', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Dropdown</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Dropdown :options="['Action', 'Another action', '', 'Something else here']">
        <Button>Button</Button>
      </Dropdown>
    </div>
  </div>

  <div class="h-72"></div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-between">
      <Dropdown :options="['Action', 'Another action', '', 'Something else here']">
        <Button>Button</Button>
      </Dropdown>

      <Dropdown :options="['Action', 'Another action', '', 'Something else here']">
        <Button>Button</Button>
      </Dropdown>

      <Dropdown :options="['Action', 'Another action', '', 'Something else here']">
        <Button>Button</Button>
      </Dropdown>

      <Dropdown :options="['Action', 'Another action', '', 'Something else here']">
        <Button>Button</Button>
      </Dropdown>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Dropdown :options="['Action', 'Another action', '', 'Something else here']">
        <div class="w-20 h-20 bg-primary-500 rounded-lg"></div>
      </Dropdown>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center gap-6">
      <template v-for="num in 8" :key="num">
        <Dropdown :options="['Action', 'Another action', '', 'Something else here']">
          <div class="w-20 h-20 bg-primary-500 rounded-lg flex justify-center items-center">
            {{ num }}
          </div>
        </Dropdown>
      </template>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center gap-8">
      <Dropdown :options="['Action', 'Another action', '', 'Something else here']">
        <div class="w-50 h-50 bg-primary-500 rounded-lg"></div>
      </Dropdown>

      <Dropdown :options="['Action', 'Another action', '', 'Something else here']">
        <div class="w-50 h-50 bg-primary-500 rounded-lg"></div>
      </Dropdown>
    </div>
  </div>

  <div class="h-72"></div>
</template>
