<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';
import Popover from '~/components/Popover.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Display', disabled: true },
      { text: 'Popover', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Popover</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center items-center gap-15">
      <Popover>
        <Button icon="i-fa-envelope" />

        <template #content>
          <div class="px-4 py-2">The content of the Popover.</div>
        </template>
      </Popover>
    </div>
  </div>
</template>
