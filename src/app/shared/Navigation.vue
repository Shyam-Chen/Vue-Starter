<template>
  <div>
    <md-toolbar class="md-primary toolbar">
      <span style="padding: .5rem"></span>
      <md-icon>toys</md-icon>
      <router-link to="/" class="md-title" style="flex: 1; text-decoration: none">Vue by Example</router-link>
    </md-toolbar>

    <div class="filling"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.toolbar {
  top: 0;
  left: auto;
  right: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-flow: row;
}

.filling {
  padding-top: 64px;
}
</style>
