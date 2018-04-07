<script>
export default {
  metaInfo: {
    title: 'Page Not Found | Vue by Example',
  },
  computed: {
    $app() {
      return this.$store.state;
    },
  },
  render() {
    return (
      <v-layout style={{ background: this.$app.theme === 'light' ? '#fff' : '#000' }} class="vfs-notfound" column justify-center align-center>
        <div class="display-2 primary--text pa-3">Whoops, 404</div>
        <div class="pa-2">The page you were looking for does not exist</div>
        <v-btn to='/' color="primary" outline>Get me out of here!</v-btn>
      </v-layout>
    );
  },
};
</script>

<style scoped>
.vfs-notfound {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}
</style>
