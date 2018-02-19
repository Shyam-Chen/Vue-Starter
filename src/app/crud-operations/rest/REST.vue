<template>
  <div>
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
          <md-input v-model="$r.addData.text"></md-input>
        </md-field>
        <div>
          <md-button class="md-raised md-primary" @click="addItem($r.addData.text)">Add</md-button>
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
          <md-table-row v-for="item in $r.dataset" :key="item._id" :md-item="item">
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
      <md-dialog :md-active.sync="$r.editData.dialog">
        <md-dialog-title>Edit</md-dialog-title>
        <div style="padding: .5rem 1.5rem">
          <md-field>
            <label>Text</label>
            <md-input v-model="$r.editData.text"></md-input>
          </md-field>
        </div>
        <md-dialog-actions>
          <md-button class="md-primary" @click="onCloseEdit()">Close</md-button>
          <md-button class="md-primary" @click="editItem($r.editData)">Save</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!-- Delete -->
      <md-dialog :md-active.sync="$r.deleteData.dialog">
        <md-dialog-title>Delete</md-dialog-title>
        <div style="padding: .5rem 1.5rem">
          Are you sure you want to delete it?
        </div>
        <md-dialog-actions>
          <md-button class="md-accent" @click="onCloseDelete()">Cancel</md-button>
          <md-button class="md-primary" @click="deleteItem($r.deleteData._id)">Confirm</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!-- Loading -->
      <div class="progress" :style="{ display: $r.loading ? '' : 'none' }">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      showDeleteDialog: false
    };
  },
  methods: {
    ...mapActions([
      'addItem',
      'searchItem',
      'editItem',
      'deleteItem'
    ]),

    onOpenEdit(item) {
      this.$r.editData.dialog = true;
      this.$r.editData._id = item._id;
      this.$r.editData.text = item.text;
    },
    onCloseEdit() {
      this.$r.editData.dialog = false;
    },

    onOpenDelete(_id) {
      this.$r.deleteData.dialog = true;
      this.$r.deleteData._id = _id;
    },
    onCloseDelete() {
      this.$r.deleteData.dialog = false;
    }
  },
  computed: {
    $r() {
      return this.$store.state.rest;
    }
  }
};
</script>

<style scoped>
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
  z-index: 100;
}
</style>
