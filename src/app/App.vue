<template>
  <div>
    <router-link to="/counter" tag="md-button" class="md-raised md-primary">Counter</router-link>
    <router-link to="/rest" tag="md-button" class="md-raised md-primary">REST</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
