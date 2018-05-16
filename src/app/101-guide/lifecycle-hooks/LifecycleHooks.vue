<template>
  <v-container fluid>
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
          <List :key="item.id" :id="item.id" :text="item.text"></List>
        </template>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
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
    console.log('[*] A: beforeCreate');
  },
  created() {
    console.log('[*] A: created');
  },
  beforeMount() {
    console.log('[*] A: beforeMount');
  },
  mounted() {
    console.log('[*] A: mounted');
  },
  beforeUpdate() {
    console.log('[*] A: beforeUpdate');
  },
  updated() {
    console.log('[*] A: updated');
  },
  beforeDestroy() {
    console.log('[*] A: beforeDestroy');
  },
  destroyed() {
    console.log('[*] A: destroyed');
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
