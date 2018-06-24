<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Conditional Rendering</div>

    <div v-if="true">Render only if v-if condition is true</div>

    <div v-if="false">Render only if v-if condition is true</div>
    <div v-else>Render only if v-else condition is false</div>

    <div v-if="type === 'A'">Render only if `type` is equal to `A`</div>
    <div v-else-if="type === 'B'">Render only if `type` is equal to `B`</div>
    <div v-else-if="type === 'C'">Render only if `type` is equal to `C`</div>
    <div v-else>Render if `type` is not `A` or `B` or `C`</div>

    <div v-show="true">Always rendered, but it should be visible only if `v-show` conditions is true</div>
  </v-layout>
</template>

<script>
// @flow

export default {};
</script>

<style scoped>
</style>
