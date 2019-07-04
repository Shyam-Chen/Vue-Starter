<template>
  <v-container id="daily-drinks" class="shell-container" fluid>
    <h1 class="mb-3">Daily Drinks</h1>

    <button class="omv-button indigo white--text mb-3" @click="setState({ dialogs: { add: true } })">Add</button>

    <table class="omv-table">
      <thead class="omv-table__header">
        <tr class="omv-table__header-row">
          <th class="omv-table__header-cell">ID</th>
          <th class="omv-table__header-cell">Name</th>
          <th class="omv-table__header-cell">Price</th>
          <th class="omv-table__header-cell">Notes</th>
          <th class="omv-table__header-cell"></th>
        </tr>
      </thead>

      <tbody class="omv-table__body">
        <tr v-for="item in dd$.dataset" :key="item.id" class="omv-table__body-row">
          <td class="omv-table__body-cell">{{ item.id }}</td>
          <td class="omv-table__body-cell">{{ item.name }}</td>
          <td class="omv-table__body-cell">{{ item.price }}</td>
          <td class="omv-table__body-cell">{{ item.notes }}</td>
          <td class="omv-table__body-cell">
            <button class="blue--text mr-2" @click="setState({ dialogs: { edit: true }, editData: item })">Edit</button>
            <button class="red--text" @click="setState({ dialogs: { delete: true }, deleteData: item })">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <aside>
      <div v-if="dd$.dialogs.add" class="omv-dialog">
        <div class="omv-dialog__content px-3 py-2">
          <h1>Add</h1>

          <form class="f-col f-center-i">
            <div>
              <label for="name">Name</label>
              <input id="name" v-model="dd$.addData.name" class="omv-input" type="text">
            </div>

            <div>
              <label for="price">Price</label>
              <input id="price" v-model="dd$.addData.price" class="omv-input" type="text">
            </div>

            <div class="f-">
              <label for="notes">Notes</label>
              <textarea id="notes" v-model="dd$.addData.notes" class="omv-input" rows="3"></textarea>
            </div>

            <div class="f-row">
              <button type="submit" class="omv-button mr-3" @click="setState({ dialogs: { add: false } })">Cancel</button>
              <button type="submit" class="omv-button indigo white--text" @click="setState({ dialogs: { add: false } }); addItem(dd$.addData)">Add</button>
            </div>
          </form>
        </div>

        <div class="omv-dialog__backdrop"></div>
      </div>

      <div v-if="dd$.dialogs.edit" class="omv-dialog">
        <div class="omv-dialog__content px-3 py-2">
          <h1>Edit</h1>

          <form class="f-col f-center-i">
            <div>
              <label for="name">Name</label>
              <input id="name" v-model="dd$.editData.name" class="omv-input" type="text">
            </div>

            <div>
              <label for="price">Price</label>
              <input id="price" v-model="dd$.editData.price" class="omv-input" type="text">
            </div>

            <div class="f-">
              <label for="notes">Notes</label>
              <textarea id="notes" v-model="dd$.editData.notes" class="omv-input" rows="3"></textarea>
            </div>

            <div class="f-row">
              <button type="submit" class="omv-button mr-3" @click="setState({ dialogs: { edit: false } })">Cancel</button>
              <button type="submit" class="omv-button indigo white--text" @click="setState({ dialogs: { edit: false } }); editItem(dd$.editData)">Edit</button>
            </div>
          </form>
        </div>

        <div class="omv-dialog__backdrop"></div>
      </div>

      <div v-if="dd$.dialogs.delete" class="omv-dialog">
        <div class="omv-dialog__content px-3 py-2">
          <h1>Delete</h1>

          <form class="f-col f-center-i">
            <div>Are you sure that you want to delete it?</div>

            <div class="f-row">
              <button type="submit" class="omv-button mr-3" @click="setState({ dialogs: { delete: false } })">Cancel</button>
              <button type="submit" class="omv-button red white--text" @click="setState({ dialogs: { delete: false } }); deleteItem(dd$.deleteData)">Delete</button>
            </div>
          </form>
        </div>

        <div class="omv-dialog__backdrop"></div>
      </div>
    </aside>
  </v-container>
</template>

<script>
// @flow

import { mapGetters, mapActions } from 'vuex';

import { IDailyDrinks } from './types';
import { init, actions, getters } from './store';

const namespace = 'dailyDrinks';

export default {
  computed: {
    dd$(): IDailyDrinks {
      return this.$store.state[namespace];
    },
    ...mapGetters(namespace, Object.keys(getters)),
  },
  created() {
    this.$store.registerModule(
      [namespace],
      { namespaced: true, state: init, actions, getters },
    );
  },
  methods: {
    ...mapActions(namespace, Object.keys(actions)),
  },
};
</script>

<style scoped>
.omv-button {
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.omv-table {
  border-collapse: collapse;
  white-space: nowrap;
  background: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  & th,
  & td {
    padding: 15px;
  }

  & th {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  & td {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  & tbody tr {
    transition-duration: 0.28s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: background-color;

    &:hover {
      background-color: #eee;
    }
  }
}

.omv-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    height: 210px;
    width: 500px;
    position: relative;
    z-index: 5;
    background: #fff;
    border-radius: 0.2rem;
  }

  &__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 4;
    background: rgba(0, 0, 0, 0.5);
  }
}

.omv-input {
  border: 1px solid #ced4da;
  color: #575962;
  border-radius: 0.25rem;
}

.f-row {
  display: flex;
  flex-direction: row;
}

.f-col {
  display: flex;
  flex-direction: column;
}

.f-wrap {
  flex-wrap: wrap;
}

.f-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.f-center-j {
  display: flex;
  justify-content: center;
}

.f-center-i {
  display: flex;
  align-items: center;
}

.f-around {
  display: flex;
  justify-content: space-around;
}

.f-between {
  display: flex;
  justify-content: space-between;
}

.f-baseline {
  display: flex;
  align-items: baseline;
}

.f-filling {
  display: flex;
  flex: 1 0 auto;
}
</style>
