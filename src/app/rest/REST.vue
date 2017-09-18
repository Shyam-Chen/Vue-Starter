<template>
  <div>
    <md-button class="md-primary" @click="search">Search</md-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'rest',
  computed: mapGetters([]),
  methods: mapActions([
    'search'
  ])
}
</script>
