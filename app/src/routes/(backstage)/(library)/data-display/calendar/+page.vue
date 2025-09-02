<script lang="ts" setup>
import { XBreadcrumb, XCalendar } from '@x/ui';
import { reactive } from 'vue';
import MyCalendar from './MyCalendar.vue';

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
    {
      date: new Date(year, month, 25),
      title: 'My event 4',
      class: 'bg-orange-500 text-white',
    },
    {
      date: new Date(year, month, 25),
      title: 'My event 5',
      class: 'bg-pink-500 text-white',
    },
    {
      date: new Date(year, month, 25),
      title: 'My event 6',
    },
    {
      date: new Date(year, month, 25),
      title: 'My event 7',
    },
    {
      date: new Date(year, month, 26),
      title: 'My event 8',
      class: 'bg-teal-500 text-white',
    },
    {
      date: new Date(year, month, 26),
      title: 'My event 9',
      class: 'bg-yellow-500 text-white',
    },
    {
      date: new Date(year, month, 26),
      title: 'My event 10',
    },
  ],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Calendar' }]" />

  <h1 class="text-4xl font-extrabold my-4">Calendar (FullCalendar.js)</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <!-- <XCalendar :events="flux.calendar1" /> -->
    <MyCalendar />
  </section>
</template>
