<script>
export default {
  metaInfo: {
    title: 'Page Not Found | Oh My Vue',
  },
  render() {
    return (
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <div class="text-xs-center">
            <div class="display-2 primary--text pa-3">Whoops, 404!</div>
            <div class="pa-2">The page you were looking for does not exist.</div>
            <v-btn to='/' color="primary" outline>Get me out of here!</v-btn>
          </div>
        </v-layout>
      </v-container>
    );
  },
};
</script>

<style scoped>
</style>
