<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XPopover, XButton } from '@x/ui';

const controlled = ref(false);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Popover' }]" />

  <div class="my-4">
    <div class="text-4xl font-extrabold">Popover</div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4">Basic</div>

    <XPopover>
      <XButton icon="i-mdi-atom" />

      <template #content>
        <div class="px-4 py-2">The content of the Popover.</div>
      </template>
    </XPopover>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold mb-4 pt-6">Controlled</div>

    <div class="flex">
      Status:
      <div>
        <code class="text-sm text-gray-700 bg-gray-300 ml-2 px-2 py-1 rounded">
          {{ controlled }}
        </code>
      </div>
    </div>

    <XPopover v-model="controlled">
      <XButton icon="i-mdi-atom" />

      <template #content>
        <div class="flex px-4 py-2">
          Status:
          <div>
            <code class="text-sm text-gray-700 bg-gray-300 ml-2 px-2 py-1 rounded">
              {{ controlled }}
            </code>
          </div>
        </div>
      </template>
    </XPopover>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Disabled</div>

    <XPopover disabled>
      <XButton icon="i-mdi-atom" disabled />

      <template #content>
        <div class="px-4 py-2">The content of the Popover.</div>
      </template>
    </XPopover>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Placement</div>

    <div class="flex justify-end">
      <XPopover>
        <XButton icon="i-mdi-atom" />

        <template #content>
          <div class="px-4 py-2">The content of the Popover.</div>
        </template>
      </XPopover>
    </div>
  </div>
</template>
