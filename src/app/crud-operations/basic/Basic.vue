<template>
  <v-layout column>
    <div class="display-1">CRUD Operations - Basic</div>

    <!-- Search -->
    <v-layout row>
      <div>
        <v-text-field name="search-text" label="Search Text"></v-text-field>
      </div>
      <v-btn>Search</v-btn>
    </v-layout>

    <!-- Add -->
    <v-layout row>
      <div>
        <v-text-field name="add-text" label="Add Text"></v-text-field>
      </div>
      <v-btn>Add</v-btn>
    </v-layout>

  </v-layout>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
