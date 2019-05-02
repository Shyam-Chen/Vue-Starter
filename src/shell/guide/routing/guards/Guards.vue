<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div class="headline mb-1">Guards</div>

      <div>{{ text }}</div>
      <div>{{ $route.params.id }}</div>

      <v-layout>
        <v-btn to="/guide/routing/guards">Leave</v-btn>
        <v-btn to="/guide/routing/guards/one">Go to One</v-btn>
        <v-btn to="/guide/routing/guards/two">Go to Two</v-btn>
        <v-btn @click="reload">Reload</v-btn>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      text: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log('[*] beforeRouteEnter');

    next((vm) => {
      vm.text.push('beforeRouteEnter');
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log('[*] beforeRouteUpdate');

    next((vm) => {
      vm.text.push('beforeRouteUpdate');
    });
  },
  beforeRouteLeave(to, from, next) {
    console.log('[*] beforeRouteLeave');

    next((vm) => {
      vm.text.push('beforeRouteLeave');
    });
  },
  methods: {
    reload() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
</style>
