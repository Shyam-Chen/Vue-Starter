<template>
  <v-layout row wrap>

    <!-- Search -->
    <v-flex xs12>
      <v-layout row>
        <div>
          <v-text-field name="search-text" label="Search Text" v-model="$r.searchData.text"></v-text-field>
        </div>
        <v-btn @click="searchItem($r.searchData.text)">Search</v-btn>
      </v-layout>
    </v-flex>

    <!-- Add -->
    <v-flex xs12>
      <v-layout row>
        <div>
          <v-text-field name="add-text" label="Add Text" v-model="$r.addData.text"></v-text-field>
        </div>
        <v-btn class="md-raised md-primary" @click="addItem($r.addData.text)">Add</v-btn>
      </v-layout>
    </v-flex>

    <!-- Display -->
    <v-flex xs12>
      <v-data-table class="elevation-1" :headers="headers" :items="$r.dataset" :loading="$r.loading">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.text }}</td>
          <td class="text-xs-right">
            <v-btn flat color="error" @click.stop="onOpenDelete(props.item._id)">Delete</v-btn>
            <v-btn flat color="info" @click.stop="onOpenEdit(props.item)">Edit</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>

    <aside>
      <!-- Delete -->
      <v-dialog v-model="$r.deleteData.dialog" max-width="500px">
        <v-card>
          <v-card-title>Delete</v-card-title>
          <v-card-text>Are you sure you want to delete it?</v-card-text>
          <v-card-actions>
            <v-btn color="success" flat @click.stop="$r.deleteData.dialog = false">Cancel</v-btn>
            <v-btn color="error" flat @click.stop="deleteItem($r.deleteData._id)">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Edit -->
      <v-dialog v-model="$r.editData.dialog" max-width="500px">
        <v-card>
          <v-card-title>Edit</v-card-title>
          <v-card-text>
            <v-layout row>
              <div>
                <v-text-field name="edit-text" label="Edit Text" v-model="$r.editData.text"></v-text-field>
              </div>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" flat @click.stop="$r.editData.dialog = false">Cancel</v-btn>
            <v-btn color="error" flat @click.stop="editItem($r.editData)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </aside>

  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      headers: [
        { text: 'Text', value: 'text' },
        { text: 'Actions', value: 'actions' },
      ],
    };
  },
  methods: {
    ...mapActions([
      'addItem',
      'searchItem',
      'editItem',
      'deleteItem',
    ]),

    onOpenEdit(item) {
      this.$r.editData.dialog = true;
      this.$r.editData._id = item._id;
      this.$r.editData.text = item.text;
    },
    onOpenDelete(_id) {
      this.$r.deleteData.dialog = true;
      this.$r.deleteData._id = _id;
    },
  },
  computed: {
    $r() {
      return this.$store.state.rest;
    },
  }
};
</script>

<style scoped>
</style>
