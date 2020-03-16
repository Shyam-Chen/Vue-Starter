<template>
  <v-container fluid>
    <v-layout>
      User Info
    </v-layout>

    <v-layout>
      {{ $route.params.username }}
    </v-layout>

    <v-layout>
      <v-btn to="/guide/routing/dynamic-matching" class="ml-0"> Back to List</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>
