<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline">CRUD Operations - REST</div>

      <!-- Search -->
      <v-layout row>
        <div>
          <v-text-field v-model="$r.searchData.text" name="search-text" label="Search Text"></v-text-field>
        </div>
        <v-btn color="primary" @click="searchItem($r.searchData.text)">Search</v-btn>
      </v-layout>

      <!-- Add -->
      <v-layout row>
        <div>
          <v-text-field v-model="$r.addData.text" name="add-text" label="Add Text"></v-text-field>
        </div>
        <v-btn color="primary" @click="addItem($r.addData.text)">Add</v-btn>
      </v-layout>

      <!-- Display -->
      <v-layout row>
        <v-card>
          <template v-if="$r.selected.length !== 0">
            <v-card-title class="vfs-card-title">
              <div class="body-2 error--text">
                {{ $r.selected.length }} selected
              </div>
              <v-spacer></v-spacer>
              <!-- Delete checked -->
              <v-btn icon class="mx-0" @click.stop="">
                <v-icon color="error">delete</v-icon>
              </v-btn>
            </v-card-title>
          </template>

          <template v-else>
            <v-card-title class="vfs-card-title">
              <div class="title">Board</div>
            </v-card-title>
          </template>

          <v-data-table :headers="headers" :items="$r.dataset" :loading="$r.loading" v-model="$r.selected" hide-actions select-all>
            <template slot="items" slot-scope="props">
              <td>
                <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
              </td>
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.text }}</td>
              <td class="text-xs-right">
                <v-btn icon class="mx-0" @click.stop="onOpenEdit(props.item)">
                  <v-icon color="info">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click.stop="onOpenDelete(props.item.id)">
                  <v-icon color="error">delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-layout>

      <aside>
        <!-- Edit -->
        <v-dialog v-model="$r.editData.dialog" max-width="500px">
          <v-card>
            <v-card-title>Edit</v-card-title>
            <v-card-text>
              <v-layout row>
                <div>
                  <v-text-field v-model="$r.editData.text" name="edit-text" label="Edit Text"></v-text-field>
                </div>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn color="error" flat @click.stop="$r.editData.dialog = false">Cancel</v-btn>
              <v-btn color="success" flat @click.stop="editItem($r.editData)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Delete -->
        <v-dialog v-model="$r.deleteData.dialog" max-width="500px">
          <v-card>
            <v-card-title>Delete</v-card-title>
            <v-card-text>Are you sure you want to delete it?</v-card-text>
            <v-card-actions>
              <v-btn color="success" flat @click.stop="$r.deleteData.dialog = false">Cancel</v-btn>
              <v-btn color="error" flat @click.stop="deleteItem($r.deleteData.id)">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </aside>

    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

import { INITIAL as state } from './constants';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Text', value: 'text' },
        { text: 'Actions', value: 'actions' },
      ],
    };
  },
  computed: {
    $r() {
      return this.$store.state.crudOperations.rest;
    },
  },
  created() {
    if (!this.$store.state.crudOperations) {
      this.$store.registerModule(['crudOperations'], { namespaced: true });
    }

    this.$store.registerModule(
      ['crudOperations', 'rest'],
      { namespaced: true, state, actions, mutations, getters },
    );
  },
  methods: {
    ...mapActions('crudOperations/rest', [
      'addItem',
      'searchItem',
      'editItem',
      'deleteItem',
    ]),
    onOpenEdit(item) {
      this.$r.editData.dialog = true;
      this.$r.editData.id = item.id;
      this.$r.editData.text = item.text;
    },
    onOpenDelete(id) {
      this.$r.deleteData.dialog = true;
      this.$r.deleteData.id = id;
    },
  },
};
</script>

<style scoped>
</style>
