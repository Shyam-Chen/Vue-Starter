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
      <v-layout justify-center align-center class="vfs-notfound" style={{ background: this.$app.theme === 'light' ? '#fff' : '#000' }}>
        <div class="display-1 pa-3">404</div>
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
