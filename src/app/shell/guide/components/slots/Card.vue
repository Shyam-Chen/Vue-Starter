<template>
  <v-card class="ma-3 o-card">
    <v-card-title primary-title>
      <div>
        <div class="headline mb-0">
          <!-- named slot -->
          <slot name="title">Title</slot>  <!-- default slot content -->
        </div>
        <div class="body-1">
          <!-- named slot -->
          <slot name="body">Contents</slot>  <!-- default slot content -->
          <div class="caption">
            <!-- slot content -->
            <slot></slot>
          </div>
        </div>
      </div>
    </v-card-title>

    <v-card-actions>
      <!-- named slot -->
      <slot name="button"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
// @flow

export default {};
</script>

<style scoped>
.o-card {
  width: 360px;
}
</style>
