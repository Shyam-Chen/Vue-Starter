<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div class="headline mb-1">Filters</div>

      <v-layout column class="mt-1 mb-1">
        <div class="title mb-2">Reverse String/Array</div>

        <div>{{ 'Vanilla Angular React Vue' | reverse }}</div>

        <template v-for="item in reverse(list)">
          <div :key="item">{{ item }}</div>
        </template>
      </v-layout>

      <v-layout column class="mt-1 mb-1">
        <div class="title mb-2">Truncate String</div>

        <div>{{ 'Approachable' | truncate }}</div>
        <div>{{ message | truncate }}</div>
        <div>{{ message | truncate(50) }}</div>
      </v-layout>

      <v-layout column class="mt-1 mb-1">
        <div class="title mb-2">Convert Time</div>

        <div>{{ 44230 | convertSeconds }}</div>
        <div>{{ 4230 | convertSeconds }}</div>
        <div>{{ 777 | convertSeconds }}</div>
        <div>{{ 390 | convertSeconds }}</div>
        <div>{{ 12 | convertSeconds }}</div>
        <div>{{ 3 | convertSeconds }}</div>
      </v-layout>

      <v-layout column class="mt-1 mb-1">
        <div class="title mb-2">Time Ago</div>

        <div>{{ Date.now() | timeSince }}</div>
        <div>{{ 1529823939463 | timeSince }}</div>
        <div>{{ '2013-01-04' | timeSince }}</div>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
// @flow

import reverse from './reverse';
import truncate from './truncate';
import convertSeconds from './convert-seconds';
import timeSince from './time-since';

export default {
  filters: {
    reverse,
    truncate,
    convertSeconds,
    timeSince,
  },
  data() {
    return {
      list: ['Vanilla', 'Angular', 'React', 'Vue'],
      message:
        'Already know HTML, CSS and JavaScript? Read the guide and start building things in no time!',
    };
  },
  methods: {
    reverse,
  },
};
</script>

<style scoped>
.layout:not(:first-child) {
  padding: 1rem;
}
</style>
