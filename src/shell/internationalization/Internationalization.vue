<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div class="headline">Internationalization</div>

      <v-layout row>
        <v-btn @click="setLanguage('en')">English</v-btn>
        <v-btn @click="setLanguage('zh')">中文</v-btn>
        <v-btn @click="setLanguage('ja')">日本語</v-btn>
      </v-layout>

      <v-layout row>
        <p class="pl-2 pt-4">
          HTML formatting:
          <b class="primary--text">{{ $t('bubble') }}</b>
        </p>
      </v-layout>

      <v-layout row>
        <p class="pl-2">
          Named formatting:
          <b class="primary--text">{{ $t('hello', { msg: 'Vue' }) }}</b>
        </p>
      </v-layout>

      <v-layout row>
        <p class="pl-2">
          List formatting:
          <b class="primary--text">{{ $t('thinkIn', ['Angular', 'React', 'Vue']) }}</b>
        </p>
      </v-layout>

      <v-layout row>
        <p class="pl-2">
          Pluralization:
          <b class="primary--text">{{ $tc('http', 2) }}://google.com</b>
        </p>
      </v-layout>

      <v-layout row>
        <p class="pl-2">
          Pluralizing i18n:
          <b class="primary--text">{{ $tc('framework', 0) }}</b
          >, <b class="primary--text">{{ $tc('framework', 1) }}</b
          >,
          <b class="primary--text">{{ $tc('framework', 3, { num: 3 }) }}</b>
        </p>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['setLanguage']),
  },
};
</script>
