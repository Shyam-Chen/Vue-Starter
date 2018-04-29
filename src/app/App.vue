<template>
  <v-fade-transition appear>
    <v-app v-cloak :dark="$app.theme === 'dark'">

      <template v-if="!$route.meta.standalone">
        <v-navigation-drawer v-if="!$route.meta.home" :clipped="$vuetify.breakpoint.mdAndUp" v-model="$app.drawer" fixed app>
          <v-toolbar class="hidden-md-and-up" flat>
            <v-toolbar-title class="ml-0 pl-3 vfs-toolbar-title">
              <router-link class="vfs-router-link" to="/">
                <img src="assets/images/logo.svg" alt="Logo" width="40" height="40">
                <span>Oh My Vue</span>
              </router-link>
            </v-toolbar-title>
          </v-toolbar>

          <v-list dense>
            <template v-for="item in $app.navigation">

              <v-subheader v-if="item.subheader" :key="item.subheader">{{ $t(item.subheader) }}</v-subheader>

              <!-- if children -->
              <v-list-group v-if="item.children" :key="item.text" :prepend-icon="item.icon" :disabled="item.disabled">
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $t(item.text) }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <template v-for="child in item.children">

                  <!-- if sub-children -->
                  <v-list-group v-if="child.children" :key="child.text" :prepend-icon="child.icon" :disabled="child.disabled" sub-group>
                    <v-list-tile slot="activator">
                      <v-list-tile-content>
                        <v-list-tile-title>{{ $t(child.text) }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile v-for="subchild in child.children" :key="subchild.text" :to="subchild.route" :disabled="subchild.disabled" ripple>
                      <v-list-tile-action>
                        <v-icon>{{ subchild.icon }}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ $t(subchild.text) }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list-group>

                  <!-- else not sub-children -->
                  <v-list-tile v-else :key="child.text" :to="child.route" :disabled="child.disabled" ripple>
                    <v-list-tile-action>
                      <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ $t(child.text) }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                </template>
              </v-list-group>

              <!-- else not children -->
              <v-list-tile v-else :key="item.text" :to="item.route" :disabled="item.disabled" ripple>
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ $t(item.text) }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

            </template>
          </v-list>
        </v-navigation-drawer>

        <v-toolbar :clipped-left="$vuetify.breakpoint.mdAndUp" :flat="$route.meta.home" class="primary darken-1" dark app fixed>
          <v-toolbar-title class="ml-0 pl-3 vfs-toolbar-title">
            <v-toolbar-side-icon v-if="!$route.meta.home" @click.stop="$app.drawer = !$app.drawer"></v-toolbar-side-icon>
            <router-link class="hidden-sm-and-down white--text vfs-router-link" to="/">
              <img src="assets/images/logo.svg" alt="Logo" width="40" height="40">
              <span>Oh My Vue</span>
            </router-link>
          </v-toolbar-title>

          <v-text-field v-if="!$route.meta.home" flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>

          <v-spacer></v-spacer>

          <v-menu bottom left>
            <v-btn slot="activator" icon dark>
              <v-icon>format_color_fill</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="setTheme('light')">
                <v-list-tile-title>Light</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="setTheme('dark')">
                <v-list-tile-title>Dark</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-menu bottom left>
            <v-btn slot="activator" icon dark>
              <v-icon>language</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="lang in $app.languages" :key="lang.key" @click="setLanguage(lang.key)">
                <v-list-tile-title>{{ lang.label }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>

        <v-content>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>

          <v-footer height="auto" class="pa-3 primary darken-1 white--text">
            <img src="/assets/images/logo.svg" alt="Logo" width="50" height="50">

            <v-layout fill-height row wrap justify-space-between align-center class="ml-3 mr-3">
              <div>
                <a href="https://vuejs.org/" class="subheading pa-2 white--text" style="text-decoration: none;">Learn Vue</a>
              </div>
              <div>Current Version: 1.0.0</div>
              <div class="caption text-xs-center">
                Powered by Oh My Vue &copy;{{ new Date().getFullYear() }}. <br>
                Code licensed under an MIT-style License. <br>
                Documentation licensed under CC BY 4.0.
              </div>
            </v-layout>
          </v-footer>
        </v-content>
      </template>

      <template v-else>
        <router-view></router-view>
      </template>

    </v-app>
  </v-fade-transition>
</template>

<script>
// @flow

import { mapActions } from 'vuex';

import { IApp } from './types';
import actions from './actions';

export default {
  computed: {
    $app(): IApp {
      return this.$store.state;
    },
  },
  created() {
    this.initialLanguage();
  },
  methods: {
    ...mapActions(Object.keys(actions)),
  },
};
</script>

<style scoped>
.vfs-toolbar-title {
  width: 300px;

  & img {
    vertical-align: middle;
  }
}

.vfs-router-link {
  text-decoration: none;
}
</style>
