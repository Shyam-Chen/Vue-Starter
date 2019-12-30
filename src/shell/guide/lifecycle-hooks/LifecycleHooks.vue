<template>
  <v-container class="shell-container" fluid>
    <v-layout>
      <div>See console</div>
    </v-layout>

    <v-layout class="mt-3">
      <div>
        <v-text-field v-model="text" name="text" label="Text"></v-text-field>
      </div>
    </v-layout>

    <v-layout column class="mt-3">
      <div>
        <v-btn class="ml-0" @click.prevent="destroy">Destroy</v-btn>
      </div>

      <div>
        <template v-for="item in list">
          <List :id="item.id" :key="item.id" :text="item.text"></List>
        </template>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
// @flow

import List from './List';

export default {
  components: {
    List,
  },
  data() {
    return {
      text: 'foo bar',
      list: [
        { id: 1, text: 'Vanilla' },
        { id: 2, text: 'Angular' },
        { id: 3, text: 'React' },
        { id: 4, text: 'Vue' },
      ],
    };
  },
  beforeCreate() {
    console.log('[*] Parent: beforeCreate');
  },
  created() {
    console.log('[*] Parent: created');
  },
  beforeMount() {
    console.log('[*] Parent: beforeMount');
  },
  mounted() {
    console.log('[*] Parent: mounted');
  },
  beforeUpdate() {
    console.log('[*] Parent: beforeUpdate');
  },
  updated() {
    console.log('[*] Parent: updated');
  },
  beforeDestroy() {
    console.log('[*] Parent: beforeDestroy');
  },
  destroyed() {
    console.log('[*] Parent: destroyed');
  },
  methods: {
    destroy(): void {
      this.list.splice(0, 1);
    },
  },
};
</script>

<style scoped>
</style>
