<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import { XBreadcrumb } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Overview' }]" />

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">General</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/general/buttons" class="card">Buttons</RouterLink>
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
      <RouterLink to="/layout/dividers" class="card">Dividers</RouterLink>
      <RouterLink to="/layout/grid" class="card">Grid</RouterLink>
      <RouterLink to="/layout/hr" class="card">HR</RouterLink>
      <RouterLink to="/layout/panel" class="card">Panel</RouterLink>
      <RouterLink to="/layout/spaces" class="card">Spaces</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Navigation</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/navigation/breadcrumbs" class="card">Breadcrumbs</RouterLink>
      <RouterLink to="/navigation/drawers" class="card">Drawers</RouterLink>
      <RouterLink to="/navigation/dropdown" class="card">Dropdown</RouterLink>
      <RouterLink to="/navigation/pagination" class="card">Pagination</RouterLink>
      <RouterLink to="/navigation/scrollspy" class="card">Scrollspy</RouterLink>
      <RouterLink to="/navigation/stepper" class="card">Stepper</RouterLink>
      <RouterLink to="/navigation/tabs" class="card">Tabs</RouterLink>
      <RouterLink to="/navigation/tours" class="card">Tours</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Data Entry</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/data-entry/autocompletes" class="card">Autocompletes</RouterLink>
      <RouterLink to="/data-entry/checkboxes" class="card">Checkboxes</RouterLink>
      <RouterLink to="/data-entry/editor" class="card">Editor</RouterLink>
      <RouterLink to="/data-entry/file-inputs" class="card">File inputs</RouterLink>
      <RouterLink to="/data-entry/form-validation" class="card">Form Validation</RouterLink>
      <RouterLink to="/data-entry/input-mask" class="card">InputMask</RouterLink>
      <RouterLink to="/data-entry/password" class="card">Password</RouterLink>
      <RouterLink to="/data-entry/pickers/date-pickers" class="card">Date pickers</RouterLink>
      <RouterLink to="/data-entry/pickers/month-pickers" class="card">Month pickers</RouterLink>
      <RouterLink to="/data-entry/pickers/time-pickers" class="card">Time pickers</RouterLink>
      <RouterLink to="/data-entry/pickers/year-pickers" class="card">Year pickers</RouterLink>
      <RouterLink to="/data-entry/pickers/week-pickers" class="card">Week pickers</RouterLink>
      <RouterLink to="/data-entry/radio-buttons" class="card">Radio buttons</RouterLink>
      <RouterLink to="/data-entry/selects/single-selects" class="card">Single Selects</RouterLink>
      <RouterLink to="/data-entry/selects/multiple-selects" class="card"
        >Multiple Selects</RouterLink
      >
      <RouterLink to="/data-entry/slider" class="card">Slider</RouterLink>
      <RouterLink to="/data-entry/switches" class="card">Switches</RouterLink>
      <RouterLink to="/data-entry/text-fields" class="card">Text fields</RouterLink>
      <RouterLink to="/data-entry/textareas" class="card">Textareas</RouterLink>
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
      <RouterLink to="/data-display/data-iterators" class="card">Data iterators</RouterLink>
      <RouterLink to="/data-display/table/dynamic-table" class="card">Dynamic Table</RouterLink>
      <RouterLink to="/data-display/table/static-table" class="card">Static Table</RouterLink>
      <RouterLink to="/data-display/tag" class="card">Tag</RouterLink>
      <RouterLink to="/data-display/popover" class="card">Popover</RouterLink>
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
      <RouterLink to="/feedback/delete-confirmation" class="card">DeleteConfirmation</RouterLink>
      <RouterLink to="/feedback/dialogs" class="card">Dialogs</RouterLink>
      <RouterLink to="/feedback/highlight" class="card">Highlight</RouterLink>
      <RouterLink to="/feedback/leave-confirmation" class="card">LeaveConfirmation</RouterLink>
      <RouterLink to="/feedback/notification" class="card">Notification</RouterLink>
      <RouterLink to="/feedback/progress" class="card">Progress</RouterLink>
      <RouterLink to="/feedback/skeletons" class="card">Skeletons</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-2 mt-4 mb-8">
    <div class="text-xl">Charts</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <RouterLink to="/charts/area-chart" class="card">AreaChart</RouterLink>
      <RouterLink to="/charts/bar-chart" class="card">BarChart</RouterLink>
      <RouterLink to="/charts/column-chart" class="card">ColumnChart</RouterLink>
      <RouterLink to="/charts/donut-chart" class="card">DonutChart</RouterLink>
      <RouterLink to="/charts/line-chart" class="card">LineChart</RouterLink>
      <RouterLink to="/charts/line-column-chart" class="card">LineColumnChart</RouterLink>
      <RouterLink to="/charts/map-chart" class="card">MapChart</RouterLink>
      <RouterLink to="/charts/pie-chart" class="card">PieChart</RouterLink>
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
