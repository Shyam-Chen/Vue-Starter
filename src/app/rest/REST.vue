<template>
  <div>
    <!-- Search -->
    <md-layout md-gutter>
      <md-layout md-flex="20">
        <md-input-container>
          <label>Text</label>
          <md-input v-model="$store.state.rest.searchData.text"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout md-flex="20">
        <div>
        <md-button class="md-raised md-primary" @click="onSearch">Search</md-button>
      </div>
      </md-layout>
    </md-layout>

    <!-- Add -->
    <md-layout md-gutter>
      <md-layout md-flex="20">
        <md-input-container>
          <label>Text</label>
          <md-input v-model="$store.state.rest.addData.text"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout md-flex="20">
        <div>
        <md-button class="md-raised md-primary" @click="onAdd">Add</md-button>
      </div>
      </md-layout>
    </md-layout>

    <!-- Data Display -->
    <ul>
      <li v-for="item in $store.state.rest.dataset">
        {{ item.text }}
        <md-button class="md-accent" id="dialog-delete" @click="onOpenDialog('dialog-delete')">Delete</md-button>
        <md-button class="md-primary" id="dialog-edit" @click="onOpenDialog('dialog-edit')">Edit</md-button>
      </li>
    </ul>

    <!-- Edit -->
    <md-dialog md-open-from="#dialog-edit" md-close-to="#dialog-edit" ref="dialog-edit">
      <md-dialog-title></md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <label>Text</label>
          <md-input></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-accent" @click="onCloseDialog('dialog-edit')">Cancel</md-button>
        <md-button class="md-primary" @click="onCloseDialog('dialog-edit')">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- Delete -->
    <md-dialog md-open-from="#dialog-delete" md-close-to="#dialog-delete" ref="dialog-delete">
      <md-dialog-title></md-dialog-title>
      <md-dialog-content>Are you sure you want to delete it?</md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-accent" @click="onCloseDialog('dialog-delete')">Cancel</md-button>
        <md-button class="md-primary" @click="onCloseDialog('dialog-delete')">Confirm</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    onSearch() {
      const { searchData } = this.$store.state.rest;

      this.$store.dispatch('setData', { loading: true });
      this.$store.dispatch('searchItem', searchData.text);
      searchData.text = '';
    },
    onAdd() {
      const { addData } = this.$store.state.rest;

      this.$store.dispatch('addItem', addData.text);
      addData.text = '';
    },
    onDelete() {
      // const { deleteData } = this.$store.state.rest;
      //
      // this.$store.dispatch('setData', {
      //   deleteData: { ...deleteData, _id, dialog: true }
      // });
      // this.$store.dispatch('deleteItem', deleteData._id);
    },
    onOpenDialog(ref) {
      this.$refs[ref].open();
    },
    onCloseDialog(ref) {
      this.$refs[ref].close();
    },

  }
};
</script>

<style scoped>
</style>
