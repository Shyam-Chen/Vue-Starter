<template>
  <v-layout column>

    <Card />  <!-- default slot content -->

    <Card>
      <div slot="title">Vue</div>  <!-- named slot -->
      <div slot="body">Approachable! Versatile! Performant!</div>  <!-- named slot -->
      <span>Awesome Vue!!!</span>  <!-- slot content -->
      <span>Awesome Vue!!!</span>  <!-- slot content -->
      <span>Awesome Vue!!!</span>  <!-- slot content -->
      <v-btn slot="button" flat color="orange">Share</v-btn>  <!-- named slot -->
      <v-btn slot="button" flat color="orange">{{ name }}</v-btn>  <!-- named slot -->
    </Card>

    <List :subheader="subheader" :items="items">
      <!-- scoped slot -->
      <template slot="items" slot-scope="props">
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ props.item.text }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ props.item.helperText }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </List>

  </v-layout>
</template>

<script>
// @flow

import Card from './Card';
import List from './List';

export default {
  components: {
    Card,
    List,
  },
  data() {
    return {
      name: 'Explore',

      subheader: 'Frameworks',
      items: [
        { id: 1, text: 'Vanilla', helperText: '+ MobX = Awesome!' },
        { id: 2, text: 'Angular', helperText: '+ NGXS = Awesome!' },
        { id: 3, text: 'React', helperText: '+ Redux = Awesome!' },
        { id: 4, text: 'Vue', helperText: '+ Vuex = Awesome!' },
      ],
    };
  },
};
</script>

<style scoped>
</style>
