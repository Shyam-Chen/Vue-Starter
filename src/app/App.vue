<template>
  <div class="container">
    <Navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '~/shared/Navigation';

export default {
  components: { Navigation }
};
</script>

<style scoped>
.container {
  background: #E3F2FD;
  height: 100vh;
  padding: 1rem;
}
</style>
