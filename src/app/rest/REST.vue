<template>
  <div>
    <md-layout md-gutter>
      <md-layout md-flex="20">

          <md-input-container>
            <label>Text</label>
            <md-input v-model="text"></md-input>
          </md-input-container>

      </md-layout>
      <md-layout md-flex="20">
        <div>
        <md-button class="md-raised md-primary" @click="onSearch">Search</md-button>
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
  // data() {
  data: function () {
    return {
      text: ''
    };
  },
  methods: Object.assign(
    {},
    mapActions([
      'addItem',
      'searchItem',
      'editItem',
      'deleteItem'
    ]),
    {
      // onSearch() {
      onSearch: function () {
        this.$store.dispatch('searchItem', this.text);
        this.text = '';
      }
    }
  )
};
</script>

<style scoped>
</style>
