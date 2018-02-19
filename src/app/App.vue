<script>
import Navigation from '~/shared/Navigation';

export default {
  render() {
    return (
      <div class="container">
        <Navigation />
        <router-view></router-view>
      </div>
    );
  }
};
</script>

<style scoped>
.container {
  background: #E3F2FD;
  height: 100vh;
  padding: 1rem;
}
</style>
