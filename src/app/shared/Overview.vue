<script>
import logo from '~assets/images/vue.png';

export default {
  metaInfo: {
    title: 'Vue by Example',
  },
  render() {
    return (
      <v-layout fill-height justify-center align-center>
        <div class="text-xs-center">
          <div class="display-1 pa-3 blue--text">Vue by Example</div>
          <img src={logo} alt="Logo" class="pa-3" />
        </div>
      </v-layout>
    );
  },
};
</script>

<style scoped>
</style>
