<template>
  <v-layout column>
    <div class="headline">CRUD Operations - Basic</div>

    <!-- Search -->
    <!-- <v-layout row>
      <div class="text-field">
        <v-text-field v-model="$b.searchData.primary" name="search-text" label="Primary"></v-text-field>
      </div>
      <div class="text-field">
        <v-text-field v-model="$b.searchData.accent" name="search-text" label="Accent"></v-text-field>
      </div>
      <v-btn @click="searchItem($b.searchData)">Search</v-btn>
    </v-layout> -->

    <!-- Add -->
    <v-layout row>
      <div class="vfs-text-field">
        <v-text-field v-model="$b.addData.primary" name="primary" label="Primary"></v-text-field>
      </div>
      <div class="vfs-text-field">
        <v-text-field v-model="$b.addData.accent" name="accent" label="Accent"></v-text-field>
      </div>
      <v-btn @click="addItem($b.addData)">Add</v-btn>
    </v-layout>

    <!-- Display -->
    <v-layout row>
      <v-card>
        <template v-if="$b.selected.length !== 0">
          <v-card-title class="pink lighten-4 vfs-card-title">
            <div class="body-2 pink--text">
              {{ $b.selected.length }} selected
            </div>
            <v-spacer></v-spacer>
            <v-btn icon class="mx-0">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </v-card-title>
        </template>

        <template v-else>
          <v-card-title class="vfs-card-title">
            <div class="title">Board</div>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
        </template>

        <v-data-table :headers="$b.headers" :items="$b.dataset" v-model="$b.selected" hide-actions select-all>
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
            </td>
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.primary }}</td>
            <td>{{ props.item.accent }}</td>
            <td class="text-xs-right">
              <v-btn icon class="mx-0">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
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
  metaInfo: {
    title: 'CRUD Operations - Basic | Vue by Example',
  },
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
    ...mapActions('crudOperations/basic', [
      'addItem',
      'searchItem',
    ]),
  },
};
</script>

<style scoped>
.vfs-text-field {
  margin: auto .33rem;
}

.vfs-card-title {
  height: 82px;
  transition: background .33s;
}
</style>
