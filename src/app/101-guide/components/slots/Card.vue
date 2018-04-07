<template>
  <v-card class="ma-3 vfs-card">
    <v-card-title primary-title>
      <div>
        <div class="headline mb-0">
          <slot name="title">Title</slot>
        </div>
        <div class="body-1">
          <slot name="body">Body</slot>
        </div>
      </div>
    </v-card-title>

    <v-card-actions>
      <slot name="button"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
// @flow

export default {};
</script>

<style scoped>
.vfs-card {
  width: 360px;
}
</style>
