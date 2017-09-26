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
        <md-button class="md-raised md-primary" @click="onSearchItem">Search</md-button>
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
        <md-button class="md-raised md-primary" @click="onAddItem">Add</md-button>
      </div>
      </md-layout>
    </md-layout>

    <!-- Data Display -->
    <ul>
      <li v-for="item in $store.state.rest.dataset">
        {{ item.text }}
        <md-button class="md-accent" id="dialog-delete" @click="onOpenDelete('dialog-delete', item._id)">Delete</md-button>
        <md-button class="md-primary" id="dialog-edit" @click="onOpenEdit('dialog-edit', item)">Edit</md-button>
      </li>
    </ul>

    <!-- Edit -->
    <md-dialog md-open-from="#dialog-edit" md-close-to="#dialog-edit" ref="dialog-edit">
      <md-dialog-title></md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <label>Text</label>
          <md-input v-model="$store.state.rest.editData.text"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-accent" @click="onCloseDialog('dialog-edit')">Cancel</md-button>
        <md-button class="md-primary" @click="onEditItem('dialog-edit')">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- Delete -->
    <md-dialog md-open-from="#dialog-delete" md-close-to="#dialog-delete" ref="dialog-delete">
      <md-dialog-title></md-dialog-title>
      <md-dialog-content>Are you sure you want to delete it?</md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-accent" @click="onCloseDialog('dialog-delete')">Cancel</md-button>
        <md-button class="md-primary" @click="onDeleteItem('dialog-delete')">Confirm</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    onSearchItem() {
      const { searchData } = this.$store.state.rest;

      this.$store.dispatch('setData', { loading: true });
      this.$store.dispatch('searchItem', searchData.text);
      searchData.text = '';
    },
    onAddItem() {
      const { addData } = this.$store.state.rest;

      this.$store.dispatch('addItem', addData.text);
      addData.text = '';
    },
    onOpenEdit(ref, item) {
      const { editData } = this.$store.state.rest;
      const { _id, text } = item;

      this.$refs[ref].open();
      this.$store.dispatch('setData', {
        editData: { ...editData, _id, text, dialog: true }
      });
    },
    onEditItem(ref) {
      const { editData } = this.$store.state.rest;
      console.log(this.$store.state.rest);

      this.$refs[ref].close();
    },
    onOpenDelete(ref, _id) {
      const { deleteData } = this.$store.state.rest;

      this.$refs[ref].open();
      this.$store.dispatch('setData', {
        deleteData: { ...deleteData, _id, dialog: true }
      });
    },
    onDeleteItem(ref) {
      const { deleteData } = this.$store.state.rest;
      console.log(this.$store.state.rest);

      this.$refs[ref].close();
      // this.$store.dispatch('deleteItem', deleteData._id);
    },
    onCloseDialog(ref) {
      this.$refs[ref].close();
    }
  }
};
</script>

<style scoped>
</style>
