<template>
  <v-fade-transition appear>
    <v-app v-cloak :dark="app$.theme === 'dark'">

      <template v-if="!$route.meta.standalone">
        <v-navigation-drawer v-if="!$route.meta.home || isMobile" :clipped="$vuetify.breakpoint.mdAndUp" v-model="app$.drawer" fixed app>
          <v-toolbar class="hidden-md-and-up" flat>
            <v-toolbar-title class="o-toolbar-title">
              <div class="o-router-link" @click="backToHome">
                <img src="/assets/images/logo.svg" alt="Logo" width="40" height="40" class="o-toolbar-image">
                <span class="primary--text">Oh My Vue</span>
              </div>
            </v-toolbar-title>
          </v-toolbar>

          <v-text-field v-if="!$route.meta.home || isMobile" solo append-icon="search" label="Search" class="hidden-md-and-up ma-3 o-text-field"></v-text-field>

          <v-divider></v-divider>

          <v-list dense>
            <template v-for="item in app$.navigation">

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
          <v-toolbar-title class="o-toolbar-title">
            <v-toolbar-side-icon v-if="!$route.meta.home || isMobile" @click.stop="app$.drawer = !app$.drawer"></v-toolbar-side-icon>
            <router-link class="white--text o-router-link" to="/">
              <img src="/assets/images/logo.svg" alt="Logo" width="40" height="40" class="hidden-sm-and-down o-toolbar-image">
              <span>Oh My Vue</span>
            </router-link>
          </v-toolbar-title>

          <v-text-field v-if="!$route.meta.home" flat solo-inverted append-icon="search" label="Search" class="hidden-sm-and-down mt-2"></v-text-field>

          <v-spacer></v-spacer>

          <v-toolbar-items v-if="$route.meta.home && !isMobile">
            <v-btn flat to="/overview">{{ $t('overview') }}</v-btn>

            <v-menu open-on-hover bottom left offset-y>
              <v-btn slot="activator" flat>{{ $t('examples') }}<v-icon dark>arrow_drop_down</v-icon></v-btn>

              <v-list>
                <v-list-tile v-for="(item, index) in app$.navigation" v-if="item.text !== 'overview'" :key="index" :to="item.route">
                  <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ $t(item.text) }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar-items>

          <v-menu bottom left>
            <v-btn slot="activator" aria-label="Theme" icon>
              <v-icon>format_color_fill</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="setTheme('light')">
                <v-list-tile-avatar class="o-list-tile-avatar">☀️</v-list-tile-avatar>
                <v-list-tile-title>Light Theme</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="setTheme('dark')">
                <v-list-tile-avatar class="o-list-tile-avatar">🌙</v-list-tile-avatar>
                <v-list-tile-title>Dark Theme</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-menu bottom left>
            <v-btn slot="activator" aria-label="Language" icon>
              <v-icon>language</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="lang in app$.languages" :key="lang.key" @click="setLanguage(lang.key)">
                <v-list-tile-avatar>
                  <img :src="`https://countryflags.io/${lang.country}/flat/24.png`" alt="Country Flag">
                </v-list-tile-avatar>
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

            <v-layout :column="isMobile" fill-height justify-space-between align-center class="ml-3 mr-3">
              <div class="subheading">
                <a href="https://vuejs.org/" class="subheading pa-2 white--text o-router-link">Learn Vue</a>
              </div>
              <div class="caption">Current Version: 2.5.17</div>
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

import { layout } from '~/shared/mixins';

import { IApp } from './types';
import actions from './actions';

export default {
  mixins: [layout],
  computed: {
    app$(): IApp {
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
.o-toolbar-title {
  width: 20rem;
}

.o-router-link {
  text-decoration: none;
  cursor: pointer;
}

.o-toolbar-image {
  vertical-align: middle;
}

.o-text-field {
  height: 3.5rem;
}

.o-list-tile-avatar {
  font-size: 2rem;
}
</style>
