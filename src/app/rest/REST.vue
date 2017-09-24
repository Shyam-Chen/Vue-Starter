<template>
  <div>
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

    <ul>
      <li v-for="item in $store.state.rest.dataset">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: Object.assign(
    {},
    mapActions([
      'addItem',
      'searchItem',
      'editItem',
      'deleteItem'
    ]),
    {
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
      }
    }
  )
};
</script>

<style scoped>
</style>
