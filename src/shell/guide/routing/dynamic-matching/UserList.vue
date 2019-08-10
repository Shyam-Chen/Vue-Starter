<template>
  <v-layout row>
    <div>
      <v-list dense class="elevation-1">
        <template v-for="item in items">
          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

          <v-list-item v-else :key="item.title" avatar @click="$router.push(`/guide/routing/dynamic-matching/${item.title}`)">
            <v-list-item-avatar>
              <img :src="item.avatar">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
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
