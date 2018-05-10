<template>
  <v-layout>
    <v-list dense class="elevation-1" style="width: 15rem;">
      <template v-for="item in items">
        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

        <v-list-tile v-else :key="item.title" avatar @click="$router.push(`/101-guide/routing/dynamic-matching/${item.title}`)">
          <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { header: 'User List' },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/1.jpg', title: 'Jason Oner' },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/2.jpg', title: 'Travis Howard' },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/3.jpg', title: 'Ali Connors' },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/4.jpg', title: 'Cindy Baker' },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/5.jpg', title: 'Britta Holt' },
      ],
    };
  },
};
</script>

<style scoped>
</style>
