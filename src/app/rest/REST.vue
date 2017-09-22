<template>
  <div>
    <div class="search">
      <md-input-container>
        <label>Text</label>
        <md-input v-model="text"></md-input>
      </md-input-container>
      <md-button class="md-primary" @click="onSearch">Search</md-button>
    </div>

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
  data() {
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
      onSearch() {
        this.$store.dispatch('searchItem', this.text);
        this.text = '';
      }
    }
  )
}
</script>

<style scoped>
.search {
  width: 10rem;
}
</style>
