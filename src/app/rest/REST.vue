<template>
  <div class="container">
    <Navigation />

    <div class="actions">
      <!-- Search -->
      <div class="search">
        <md-input-container>
          <label>Text</label>
          <md-input v-model="$store.state.rest.searchData.text" ></md-input>
        </md-input-container>
        <div>
          <md-button class="md-raised md-primary" @click="onSearchItem">Search</md-button>
        </div>
      </div>

      <!-- Add -->
      <div class="add">
        <md-input-container>
          <label>Text</label>
          <md-input v-model="$store.state.rest.addData.text"></md-input>
        </md-input-container>
        <div>
          <md-button class="md-raised md-primary" @click="onAddItem">Add</md-button>
        </div>
      </div>
    </div>

    <!-- Data Display -->
    <div style="width: 30rem; margin: 1rem">
      <md-table-card>
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head>Text</md-table-head>
              <md-table-head></md-table-head>
              <md-table-head></md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="item in $store.state.rest.dataset" :key="item._id" :md-item="item">
              <md-table-cell>{{ item.text }}</md-table-cell>
              <md-table-cell>
                <md-button style="width: 100%" class="md-accent" id="dialog-delete" @click="onOpenDelete('dialog-delete', item._id)">Delete</md-button>
              </md-table-cell>
              <md-table-cell>
                <md-button style="width: 100%" class="md-primary" id="dialog-edit" @click="onOpenEdit('dialog-edit', item)">Edit</md-button>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-table-card>
    </div>

    <aside>
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

      <!-- Loading -->
      <div class="progress" :style="{ display: $store.state.rest.loading ? '' : 'none' }">
        <md-spinner md-indeterminate></md-spinner>
      </div>
    </aside>
  </div>
</template>

<script>
import Navigation from '~/shared/Navigation';

export default {
  methods: {
    onSearchItem() {
      const { rest } = this.$store.state;

      rest.loading = true;
      this.$store.dispatch('searchItem', rest.searchData.text)
        .then(() => { rest.searchData.text = ''; });
    },

    onAddItem() {
      const { rest } = this.$store.state;

      if (rest.addData.text) {
        rest.loading = true;
        this.$store.dispatch('addItem', rest.addData.text)
          .then(() => { rest.addData.text = ''; });
      }
    },

    onOpenEdit(ref, { _id, text }) {
      const { rest } = this.$store.state;

      this.$refs[ref].open();
      rest.editData = { _id, text };
    },
    onEditItem(ref) {
      const { rest } = this.$store.state;

      if (rest.editData.text) {
        this.$refs[ref].close();
        rest.loading = true;
        this.$store.dispatch('editItem', rest.editData);
      }
    },

    onOpenDelete(ref, _id) {
      const { rest } = this.$store.state;

      this.$refs[ref].open();
      rest.deleteData = { _id };
    },
    onDeleteItem(ref) {
      const { rest } = this.$store.state;

      this.$refs[ref].close();
      rest.loading = true;
      this.$store.dispatch('deleteItem', rest.deleteData._id);
    },

    onCloseDialog(ref) {
      this.$refs[ref].close();
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
