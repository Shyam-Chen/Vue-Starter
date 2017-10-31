<template>
  <div class="container">
    <Navigation />

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
  background: #FAFAFA;
  height: 100vh;
  padding: 1rem;
}
</style>
