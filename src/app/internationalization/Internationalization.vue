<i18n src="./translation.yml"></i18n>

<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline">Internationalization</div>

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
          <b class="primary--text">{{ $tc('framework', 0) }}</b>,
          <b class="primary--text">{{ $tc('framework', 1) }}</b>,
          <b class="primary--text">{{ $tc('framework', 3, { num: 3 }) }}</b>
        </p>
      </v-layout>

    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
