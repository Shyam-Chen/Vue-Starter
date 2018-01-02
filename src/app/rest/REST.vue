<template>
  <div class="container">
    <Navigation />

    <div class="actions">
      <!-- Search -->
      <div class="search">
        <md-field>
          <label>Text</label>
          <md-input v-model="$r.searchData.text"></md-input>
        </md-field>
        <div>
          <md-button class="md-raised md-primary" @click="searchItem($r.searchData.text)">Search</md-button>
        </div>
      </div>

      <!-- Add -->
      <div class="add">
        <md-field>
          <label>Text</label>
          <md-input v-model="$store.state.rest.addData.text"></md-input>
        </md-field>
        <div>
          <md-button class="md-raised md-primary" @click="onAddItem">Add</md-button>
        </div>
      </div>
    </div>

    <!-- Data Display -->
    <div style="width: 30rem; margin: 1rem">
      <md-table md-card>
        <!-- <md-table-header> -->
          <md-table-row>
            <md-table-head>Text</md-table-head>
            <md-table-head></md-table-head>
            <md-table-head></md-table-head>
          </md-table-row>
        <!-- </md-table-header> -->

        <!-- <md-table-body> -->
          <md-table-row v-for="item in $store.state.rest.dataset" :key="item._id" :md-item="item">
            <md-table-cell>{{ item.text }}</md-table-cell>
            <md-table-cell>
              <md-button style="width: 100%" class="md-accent" id="dialog-delete" @click="onOpenDelete(item._id)">Delete</md-button>
            </md-table-cell>
            <md-table-cell>
              <md-button style="width: 100%" class="md-primary" id="dialog-edit" @click="onOpenEdit(item)">Edit</md-button>
            </md-table-cell>
          </md-table-row>
        <!-- </md-table-body> -->
      </md-table>
    </div>

    <aside>
      <!-- Edit -->
      <md-dialog :md-active.sync="showEditDialog">
        <md-dialog-title>Edit</md-dialog-title>
        <div style="padding: .5rem 1.5rem">
          <md-field>
            <label>Text</label>
            <md-input v-model="$store.state.rest.editData.text"></md-input>
          </md-field>
        </div>
        <md-dialog-actions>
          <md-button class="md-primary" @click="onCloseEdit()">Close</md-button>
          <md-button class="md-primary" @click="onEditItem()">Save</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!-- Delete -->
      <md-dialog :md-active.sync="showDeleteDialog">
        <md-dialog-title>Delete</md-dialog-title>
        <div style="padding: .5rem 1.5rem">
          Are you sure you want to delete it?
        </div>
        <md-dialog-actions>
          <md-button class="md-accent" @click="onCloseDelete()">Cancel</md-button>
          <md-button class="md-primary" @click="onDeleteItem()">Confirm</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!-- Loading -->
      <div class="progress" :style="{ display: $store.state.rest.loading ? '' : 'none' }">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Navigation from '~/shared/Navigation';

export default {
  data() {
    return {
      showEditDialog: false,
      showDeleteDialog: false
    };
  },
  methods: {
    ...mapActions(['searchItem']),

    onAddItem() {
      const { rest } = this.$store.state;

      if (rest.addData.text) {
        rest.loading = true;
        this.$store.dispatch('addItem', rest.addData.text)
          .then(() => { rest.addData.text = ''; });
      }
    },

    onOpenEdit({ _id, text }) {
      const { rest } = this.$store.state;

      this.showEditDialog = true;
      rest.editData = { _id, text };
    },
    onCloseEdit() {
      this.showEditDialog = false;
    },
    onEditItem() {
      const { rest } = this.$store.state;

      if (rest.editData.text) {
        this.showEditDialog = false;
        rest.loading = true;
        this.$store.dispatch('editItem', rest.editData);
      }
    },

    onOpenDelete(_id) {
      const { rest } = this.$store.state;

      this.showDeleteDialog = true;
      rest.deleteData = { _id };
    },
    onCloseDelete() {
      this.showDeleteDialog = false;
    },
    onDeleteItem() {
      const { rest } = this.$store.state;

      this.showDeleteDialog = false;
      rest.loading = true;
      this.$store.dispatch('deleteItem', rest.deleteData._id);
    }
  },
  computed: {
    ['$r']() {
      return this.$store.state.rest;
    }
  },
  components: { Navigation }
};
</script>

<style scoped>
.container {
  background: #FAFAFA;
  height: 100vh;
  padding: 1rem;
}

.actions {
  margin: 1rem;
}

.search,
.add {
  width: 17.5rem;
  display: flex;
  flex-direction: row;
}

.progress {
  position: absolute;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(225, 225, 255, .7);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
</style>
