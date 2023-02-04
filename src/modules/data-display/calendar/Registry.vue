<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Calendar from '~/components/Calendar.vue';

const year = new Date().getFullYear();
const month = new Date().getMonth();

const flux = reactive({
  calendar1: [
    {
      date: new Date(year, month, 1),
      title: 'Lunch with mom.',
      class: 'bg-red-600 text-white',
    },
    {
      date: new Date(year, month, 2),
      title: 'Take Noah to basketball practice',
      class: 'bg-sky-500 text-white',
    },
    {
      date: new Date(year, month, 5),
      title: "Noah's basketball game.",
      class: 'bg-blue-500 text-white',
    },
    {
      date: new Date(year, month, 5),
      title: 'Take car to the shop',
      class: 'bg-indigo-500 text-white',
    },
    {
      date: new Date(year, month, 7),
      title: 'Meeting with new client.',
      class: 'bg-teal-500 text-white',
    },
    {
      date: new Date(year, month, 11),
      title: "Mia's gymnastics practice.",
      class: 'bg-pink-500 text-white',
    },
    {
      date: new Date(year, month, 20),
      title: 'My event 1',
      class: 'bg-purple-500 text-white',
    },
    {
      date: new Date(year, month, 21),
      title: 'My event 1',
      class: 'bg-purple-500 text-white',
    },
    {
      date: new Date(year, month, 20),
      title: 'My event 2',
      class: 'bg-fuchsia-500 text-white',
    },
    {
      date: new Date(year, month, 22),
      title: 'My event 3',
    },
  ],
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Display', disabled: true },
      { text: 'Calendar', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Calendar</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Calendar :events="flux.calendar1" />
    </div>
  </div>
</template>
