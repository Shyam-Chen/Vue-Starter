<template>
  <div>
    <md-toolbar>
      <md-button class="md-icon-button">
        <md-icon>toys</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">Vue by Example</h2>
    </md-toolbar>

    <router-link to="/counter" tag="md-button" class="md-raised md-primary">Counter</router-link>
    <router-link to="/rest" tag="md-button" class="md-raised md-primary">REST</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  margin: .5rem 1rem;
}
</style>
