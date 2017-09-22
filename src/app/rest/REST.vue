<template>
  <div>
    <div class="search">
      <md-input-container>
        <label>Text</label>
        <md-input></md-input>
      </md-input-container>
      <md-button class="md-primary" @click="searchItem">Search</md-button>
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
  // name: 'rest',
  // computed: mapGetters([]),
  methods: mapActions([
    'searchItem'
  ])
}
</script>

<style scoped>
.search {
  width: 10rem;
}
</style>
