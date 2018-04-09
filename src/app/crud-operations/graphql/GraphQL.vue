<template>
  <v-layout column>
    <div class="headline">CRUD Operations - GraphQL</div>

    <!-- Search -->
    <v-layout row>
      <div>
        <v-text-field v-model="$g.searchData.text" name="search-text" label="Search Text" disabled></v-text-field>
      </div>
      <v-btn color="primary" @click="onSearch()">Search</v-btn>
    </v-layout>

    <v-layout row>
      <v-data-table :headers="headers" :items="textList" hide-actions select-all>
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.text }}</td>
          <td class="text-xs-right">
            <v-btn icon class="mx-0" @click.stop="">
              <v-icon color="info">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click.stop="">
              <v-icon color="error">delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-layout>

  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import gql from 'graphql-tag';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  apollo: {
    textList: {
      query: gql`
        {
          textList {
            id
            text
          }
        }
      `,
      skip() {
        return this.textList;
      },
    },
  },
  data() {
    return {
      textList: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Text', value: 'text' },
        { text: 'Actions', value: 'actions' },
      ],
    };
  },
  computed: {
    $g() {
      return this.$store.state.crudOperations.graphql;
    },
  },
  created() {
    this.$store.registerModule(
      ['crudOperations', 'graphql'],
      { namespaced: true, state, actions, mutations, getters },
    );
  },
  methods: {
    ...mapActions('crudOperations/graphql', Object.keys(actions)),
    onSearch() {
      this.$apollo.queries.textList.skip = false;
    },
  },
};
</script>

<style scoped>
</style>
