<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import { XBreadcrumb } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Overview' }]" />

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">General</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/general/buttons" class="card">Button</RouterLink>
      <RouterLink to="/general/buttons" class="card">ButtonGroup</RouterLink>
      <RouterLink to="/general/icons" class="card">Icons</RouterLink>
      <RouterLink to="/general/paper" class="card">Paper</RouterLink>
      <RouterLink to="/general/scrollbar" class="card">Scrollbar</RouterLink>
      <RouterLink to="/general/typography" class="card">Typography</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Layout</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/layout/aspect-ratio" class="card">Aspect Ratio</RouterLink>
      <RouterLink to="/layout/dividers" class="card">Divider</RouterLink>
      <RouterLink to="/layout/grid" class="card">Grid</RouterLink>
      <RouterLink to="/layout/hr" class="card">HR</RouterLink>
      <RouterLink to="/layout/panel" class="card">Panel</RouterLink>
      <RouterLink to="/layout/spaces" class="card">Spaces</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Navigation</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/navigation/breadcrumbs" class="card">Breadcrumb</RouterLink>
      <RouterLink to="/navigation/drawers" class="card">Drawer</RouterLink>
      <RouterLink to="/navigation/dropdown" class="card">Dropdown</RouterLink>
      <RouterLink to="/navigation/pagination" class="card">Pagination</RouterLink>
      <RouterLink to="/navigation/scrollspy" class="card">Scrollspy</RouterLink>
      <RouterLink to="/navigation/stepper" class="card">Stepper</RouterLink>
      <RouterLink to="/navigation/tabs" class="card">Tabs</RouterLink>
      <RouterLink to="/navigation/tours" class="card">Tour</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Data Entry</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/data-entry/autocompletes" class="card">Autocomplete</RouterLink>
      <RouterLink to="/data-entry/autocompletes" class="card">Multiautocomplete</RouterLink>
      <RouterLink to="/data-entry/checkbox-group" class="card">CheckboxGroup</RouterLink>
      <RouterLink to="/data-entry/checkboxes" class="card">Checkbox</RouterLink>
      <RouterLink to="/data-entry/editor" class="card">RichTextEditor</RouterLink>
      <RouterLink to="/data-entry/file-inputs" class="card">FileInput</RouterLink>
      <RouterLink to="/data-entry/form-validation" class="card">Form Validation</RouterLink>
      <RouterLink to="/data-entry/input-mask" class="card">InputMask</RouterLink>
      <RouterLink to="/data-entry/password" class="card">Password</RouterLink>
      <RouterLink to="/data-entry/pickers/date-pickers" class="card">DatePicker</RouterLink>
      <RouterLink to="/data-entry/pickers/month-pickers" class="card">MonthPicker</RouterLink>
      <RouterLink to="/data-entry/pickers/time-pickers" class="card">TimePicker</RouterLink>
      <RouterLink to="/data-entry/pickers/year-pickers" class="card">YearPicker</RouterLink>
      <RouterLink to="/data-entry/pickers/week-pickers" class="card">WeekPicker</RouterLink>
      <RouterLink to="/data-entry/radio-buttons" class="card">RadioGroup</RouterLink>
      <RouterLink to="/data-entry/selects/single-selects" class="card">Select</RouterLink>
      <RouterLink to="/data-entry/selects/multiple-selects" class="card">Multiselect</RouterLink>
      <RouterLink to="/data-entry/selects/tree-select" class="card">TreeSelect</RouterLink>
      <RouterLink to="/data-entry/slider" class="card">Slider</RouterLink>
      <RouterLink to="/data-entry/switches" class="card">Switch</RouterLink>
      <RouterLink to="/data-entry/text-fields" class="card">TextField</RouterLink>
      <RouterLink to="/data-entry/textareas" class="card">Textarea</RouterLink>
      <RouterLink to="/data-entry/transfer" class="card">Transfer</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Data Display</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/data-display/accordion" class="card">Accordion</RouterLink>
      <RouterLink to="/data-display/avatar" class="card">Avatar</RouterLink>
      <RouterLink to="/data-display/badge" class="card">Badge</RouterLink>
      <RouterLink to="/data-display/calendar" class="card">Calendar</RouterLink>
      <RouterLink to="/data-display/card" class="card">Card</RouterLink>
      <RouterLink to="/data-display/carousel" class="card">Carousel</RouterLink>
      <RouterLink to="/data-display/chip" class="card">Chip</RouterLink>
      <RouterLink to="/data-display/infinite-scroll" class="card">Infinite Scroll</RouterLink>
      <RouterLink to="/data-display/iterator" class="card">Iterator</RouterLink>
      <RouterLink to="/data-display/listbox" class="card">Listbox</RouterLink>
      <RouterLink to="/data-display/popover" class="card">Popover</RouterLink>
      <RouterLink to="/data-display/table/dynamic-table" class="card">Dynamic Table</RouterLink>
      <RouterLink to="/data-display/table/static-table" class="card">Static Table</RouterLink>
      <RouterLink to="/data-display/tag" class="card">Tag</RouterLink>
      <RouterLink to="/data-display/timeline" class="card">Timeline</RouterLink>
      <RouterLink to="/data-display/tooltip" class="card">Tooltip</RouterLink>
      <RouterLink to="/data-display/tree" class="card">Tree</RouterLink>
      <RouterLink to="/data-display/tree-table" class="card">TreeTable</RouterLink>
      <RouterLink to="/data-display/virtual-scroll" class="card">Virtual Scroll</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Feedback</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/feedback/alert" class="card">Alert</RouterLink>
      <RouterLink to="/feedback/chat-bubble" class="card">ChatBubble</RouterLink>
      <RouterLink to="/feedback/delete-confirmation" class="card">DeleteConfirmation</RouterLink>
      <RouterLink to="/feedback/dialogs" class="card">Dialog</RouterLink>
      <RouterLink to="/feedback/highlight" class="card">Highlight</RouterLink>
      <RouterLink to="/feedback/leave-confirmation" class="card">LeaveConfirmation</RouterLink>
      <RouterLink to="/feedback/meter-group" class="card">MeterGroup</RouterLink>
      <RouterLink to="/feedback/notification" class="card">Notification</RouterLink>
      <RouterLink to="/feedback/progress" class="card">Progress</RouterLink>
      <RouterLink to="/feedback/skeletons" class="card">Skeleton</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Charts</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/charts/line-area" class="card">Line & Area</RouterLink>
      <RouterLink to="/charts/bar-column" class="card">Bar & Column</RouterLink>
      <RouterLink to="/charts/pie-donut" class="card">Pie & Donut</RouterLink>
      <RouterLink to="/charts/scatter-bubble" class="card">Scatter & Bubble</RouterLink>
      <RouterLink to="/charts/mixed" class="card">Mixed</RouterLink>
      <RouterLink to="/charts/map" class="card">Map</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Network</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/network/fetch" class="card">Fetch</RouterLink>
      <RouterLink to="/network/websocket" class="card">WebSocket</RouterLink>
      <RouterLink to="/network/eventsource" class="card">EventSource</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply relative col-span-1 border border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 rounded p-2;
  @apply hover:after:block hover:important:border-transparent after:hidden after:content-[''] after:absolute after:rounded after:-z-1;

  &::after {
    top: -3px;
    left: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    background: linear-gradient(60deg, #6644ff, #ff99dd);
    background-size: 300% 300%;
    animation: animatedgradient 2s ease alternate infinite;

    @keyframes animatedgradient {
      0% {
        background-position: 0% 50%;
      }

      50% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0% 50%;
      }
    }
  }
}
</style>
