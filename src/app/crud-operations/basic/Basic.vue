<template>
  <v-layout column>
    <div class="headline">CRUD Operations - Basic</div>

    <!-- Search -->
    <v-layout row>
      <div class="text-field">
        <v-text-field name="search-text" label="Primary"></v-text-field>
      </div>
      <div class="text-field">
        <v-text-field name="search-text" label="Accent"></v-text-field>
      </div>
      <v-btn>Search</v-btn>
    </v-layout>

    <!-- Add -->
    <v-layout row>
      <div class="text-field">
        <v-text-field v-model="$b.addData.primary" name="primary" label="Primary"></v-text-field>
      </div>
      <div class="text-field">
        <v-text-field v-model="$b.addData.accent" name="accent" label="Accent"></v-text-field>
      </div>
      <v-btn @click="addItem($b.addData)">Add</v-btn>
    </v-layout>

    <!-- Display -->
    <v-layout row>
      <v-data-table :headers="$b.headers" :items="$b.dataset" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.primary }}</td>
          <td>{{ props.item.accent }}</td>
          <td class="text-xs-right">
            <v-btn flat color="error">Delete</v-btn>
            <v-btn flat color="info">Edit</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-layout>

  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  // metaInfo: {
  //   title: 'CRUD Operations - Basic | Vue by Example',
  // },
  computed: {
    $b() {
      return this.$store.state.crudOperations.basic;
    },
  },
  created() {
    this.$store.registerModule(
      ['crudOperations', 'basic'],
      { namespaced: true, state, actions, mutations, getters },
    );
  },
  methods: {
    ...mapActions('crudOperations/basic', ['addItem']),
  },
};
</script>

<style scoped>
.text-field {
  margin: auto .33rem;
}
</style>
