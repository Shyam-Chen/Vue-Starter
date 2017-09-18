<template>
  <div>
    <md-button class="md-primary" @click="search">Search</md-button>

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
    'search'
  ])
}
</script>
