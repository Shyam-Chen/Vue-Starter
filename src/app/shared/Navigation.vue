<template>
  <div>
    <header>
      <h3>Vue by Example</h3>
    </header>

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
