<template>
  <v-app>

    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="$app.drawer">
      <v-list dense>
        <template v-for="item in $app.navigation">

          <!-- if -->
          <v-list-group v-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.icon">

            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-for="(child, index) in item.children" :key="index" :to="child.route" :disabled="child.disabled">
              <v-list-tile-action>
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
          <v-list-tile v-else :key="item.text" :to="item.route" :disabled="item.disabled">
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
      <v-toolbar-title class="ml-0 pl-3" style="width: 300px">
        <v-toolbar-side-icon @click.stop="$app.drawer = !$app.drawer"></v-toolbar-side-icon>
        <router-link class="hidden-sm-and-down white--text" style="text-decoration: none" to="/">Vue by Example</router-link>
      </v-toolbar-title>

      <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/Shyam-Chen/Vue-Fullstack-Starter" class="mr-3">
        <i class="fa fa-github headline"></i>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer inset class="pa-3 blue darken-3 white--text">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} - Vue by Example</div>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  computed: {
    $app() {
      return this.$store.state;
    },
  },
};
</script>

<style scoped>
</style>
