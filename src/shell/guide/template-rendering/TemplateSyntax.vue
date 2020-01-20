<template>
  <v-layout column class="my-1">
    <div class="title mb-2">Template Syntax</div>
    <div>{{ text }}, {{ text.length }}</div>
    <div>{{ number + 1 }}</div>
    <div>{{ list[3] }}</div>
  </v-layout>
</template>

<script>
// @flow

type Data = {
  text: string,
  number: number,
  list: string[],
};

export default {
  data(): Data {
    return {
      text: 'foo',
      number: 10,
      list: ['Vanilla', 'Angular', 'React', 'Vue'],
    };
  },
};
</script>
