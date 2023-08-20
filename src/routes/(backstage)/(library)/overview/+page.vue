<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Overview' }]" />

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">General</div>

    <div class="grid grid-cols-4 gap-2">
      <div class="card">Buttons</div>
      <div class="card">Icons</div>
      <div class="card">Paper</div>
      <div class="card">Scrollbar</div>

      <div class="card">Typography</div>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Layout</div>

    <div class="grid grid-cols-4 gap-2">
      <div class="card">Aspect Ratio</div>
      <div class="card">Dividers</div>
      <div class="card">Grid</div>
      <div class="card">HR</div>

      <div class="card">Spaces</div>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Navigation</div>

    <div class="grid grid-cols-4 gap-2">
      <div class="card">Breadcrumbs</div>
      <div class="card">Drawers</div>
      <div class="card">Dropdown</div>
      <div class="card">Pagination</div>

      <div class="card">Steppers</div>
      <div class="card">Tabs</div>
      <div class="card">Tours</div>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Data Entry</div>

    <div class="grid grid-cols-4 gap-2">
      <div class="card">Autocompletes</div>
      <div class="card">Checkboxes</div>
      <div class="card">File inputs</div>
      <div class="card">Form Validation</div>

      <div class="card">Pickers</div>
      <div class="card">Radio buttons</div>
      <div class="card">Selects</div>
      <div class="card">Slider</div>

      <div class="card">Switches</div>
      <div class="card">Text fields</div>
      <div class="card">Textareas</div>
      <div class="card">Transfer</div>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Data Display</div>

    <div class="grid grid-cols-4 gap-2">
      <div class="card">Accordion</div>
      <div class="card">Avatar</div>
      <div class="card">Badge</div>
      <div class="card">Calendar</div>

      <div class="card">Card</div>
      <div class="card">Chip</div>
      <div class="card">Data iterators</div>
      <div class="card">Table</div>

      <div class="card">Popover</div>
      <div class="card">Timeline</div>
      <div class="card">Tooltip</div>
      <div class="card">Virtual Scroll</div>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Feedback</div>

    <div class="grid grid-cols-4 gap-2">
      <div class="card">Alert</div>
      <div class="card">Dialogs</div>
      <div class="card">Highlight</div>
      <div class="card">Notification</div>

      <div class="card">Progress</div>
      <div class="card">Skeletons</div>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Charts</div>

    <div class="grid grid-cols-4 gap-2">
      <div class="card">Line</div>
      <div class="card">Area</div>
      <div class="card">Column</div>
      <div class="card">Bar</div>

      <div class="card">Pie</div>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Network</div>

    <div class="grid grid-cols-4 gap-2">
      <div class="card">Fetch</div>
      <div class="card">WebSocket</div>
      <div class="card">EventSource</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply col-span-1 border border-primary-500 rounded p-2;
}
</style>
