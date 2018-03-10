<template>
  <v-app>

    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="$app.drawer">
      <v-list dense>
        <template v-for="item in $app.navigation">

          <!-- if -->
          <v-list-group v-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <!-- else -->
          <v-list-tile v-else @click="" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="$app.drawer = !$app.drawer"></v-toolbar-side-icon>
        <router-link class="hidden-sm-and-down" to="/" style="color: #fff; text-decoration: none">Vue by Example</router-link>
      </v-toolbar-title>

      <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/Shyam-Chen/Vue-Fullstack-Starter" style="margin-right: 16px">
        <i class="fa fa-github" style="font-size: 24px"></i>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <v-btn @click="setLanguage('en')">English</v-btn>
        <v-btn @click="setLanguage('zh')">中文</v-btn>
        <v-btn @click="setLanguage('ja')">日本語</v-btn>
        <p>{{ $t('message.hello') }}</p>
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
export default {
  computed: {
    $app() {
      return this.$store.state;
    },
  },
  methods: {
    setLanguage(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>
