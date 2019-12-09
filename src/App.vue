<template>
  <v-app>
    <template v-if="!$route.meta.standalone">
      <v-navigation-drawer v-if="!$route.meta.home || isMobile" v-model="app$.drawer" :clipped="$vuetify.breakpoint.mdAndUp" app>
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

        <v-list nav dense>
          <template v-for="item in app$.navigation">
            <v-divider v-if="item.divider" :key="item.subheader + 'Divider'"></v-divider>
            <v-subheader v-if="item.subheader" :key="item.subheader">
              {{ $t(item.subheader) }}
            </v-subheader>

            <!-- if children -->
            <v-list-group v-if="item.children" :key="item.text" :prepend-icon="item.icon" :append-icon="icons.mdiChevronDown" :disabled="item.disabled">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
                </v-list-item-content>
              </template>

              <template v-for="child in item.children">
                <!-- if sub-children -->
                <v-list-group v-if="child.children" :key="child.text" :prepend-icon="icons.mdiMenuDown" :disabled="child.disabled" sub-group>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>{{ $t(child.text) }}</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item v-for="subchild in child.children" :key="subchild.text" :to="`/${$route.params.lang}` + subchild.route" :disabled="subchild.disabled" ripple>
                    <v-list-item-action>
                      <v-icon>{{ subchild.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>{{ $t(subchild.text) }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>

                <!-- else not sub-children -->
                <v-list-item v-else :key="child.text" :to="`/${$route.params.lang}` + child.route" :disabled="child.disabled" ripple>
                  <v-list-item-action>
                    <v-icon>{{ child.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t(child.text) }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>

            <!-- else not children -->
            <v-list-item v-else :key="item.text" :to="`/${$route.params.lang}` + item.route" :href="item.href" :disabled="item.disabled" ripple>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar :clipped-left="$vuetify.breakpoint.mdAndUp" :flat="$route.meta.home" class="primary darken-1" dark app>
        <v-toolbar-title class="o-toolbar-title">
          <v-app-bar-nav-icon v-if="!$route.meta.home || isMobile" @click.stop="app$.drawer = !app$.drawer">
            <v-icon>{{ icons.mdiMenu }}</v-icon>
          </v-app-bar-nav-icon>
          <router-link class="white--text o-router-link" :to="`/${$route.params.lang}`">
            <img src="/assets/images/logo.svg" alt="Logo" width="40" height="40" class="hidden-sm-and-down o-toolbar-image">
            <span>Oh My Vue</span>
          </router-link>
        </v-toolbar-title>

        <v-text-field v-if="!$route.meta.home" flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>

        <v-spacer></v-spacer>

        <v-toolbar-items v-if="$route.meta.home && !isMobile">
          <v-btn :to="`/${$route.params.lang}/overview`" text>
            {{ $t('overview') }}
          </v-btn>

          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                {{ $t('examples') }}<v-icon dark>
                  arrow_drop_down
                </v-icon>
              </v-btn>
            </template>

            <v-list>
              <template v-for="(item, index) in app$.navigation">
                <v-list-item v-if="index > 0 && index < 12" :key="index" :to="`/${$route.params.lang}` + item.route">
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </v-toolbar-items>

        <v-btn aria-label="Theme" icon @click="setTheme(!$vuetify.theme.dark ? 'dark' : 'light')">
          <v-icon>{{ $vuetify.theme.dark ? icons.mdiLightbulb : icons.mdiLightbulbOutline }}</v-icon>
        </v-btn>

        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn aria-label="Language" icon v-on="on">
              <v-icon>{{ icons.mdiTranslate }}</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="lang in app$.languages" :key="lang.key" @click="setLanguage(lang.key)">
              <v-list-item-title>{{ lang.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn icon to="/authorization/login">
          <v-icon>{{ icons.mdiAccount }}</v-icon>
        </v-btn>
      </v-app-bar>

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
            <div class="caption">
              Current Version: 2.6.10
            </div>
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
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </template>
  </v-app>
</template>

<script>
// @flow

import { mapActions } from 'vuex';
import {
  mdiAccount,
  mdiChevronDown,
  mdiLightbulb,
  mdiLightbulbOutline,
  mdiMenu,
  mdiMenuDown,
  mdiTranslate,
} from '@mdi/js';

import layout from '~/shared/composes/layout';

import { IApp } from './types';
import actions from './actions';

export default {
  mixins: [layout],
  data() {
    return {
      icons: {
        mdiAccount,
        mdiChevronDown,
        mdiLightbulb,
        mdiLightbulbOutline,
        mdiMenu,
        mdiMenuDown,
        mdiTranslate,
      },
    };
  },
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

.o-list-item-avatar {
  font-size: 2rem;
}
</style>
