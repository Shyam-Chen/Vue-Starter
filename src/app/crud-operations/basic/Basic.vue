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

    <!-- Display -->
    <v-layout row>
      <v-data-table class="elevation-1" :headers="$b.headers" :items="$b.dataset">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.primary }}</td>
          <td>{{ props.item.accent }}</td>
          <td class="text-xs-right">
            <v-btn flat color="error">Delete</v-btn>
            <v-btn flat color="info">Edit</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-layout>

  </v-layout>
</template>

<script>
export default {
  computed: {
    $b() {
      return this.$store.state.basic;
    },
  },
};
</script>

<style scoped>
</style>
