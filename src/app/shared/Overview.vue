<script>
import logo from '~assets/images/vue.png';

export default {
  metaInfo: {
    title: 'Vue by Example',
  },
  render() {
    return (
      <v-layout column>

        <v-layout justify-center>
          <div class="header">
            <div class="display-1">Vue by Example</div>
            <img src={logo} alt="Logo" />
          </div>
        </v-layout>

        <v-layout>
          <div>
            <v-btn color="info" to="/hello-world">Hello World</v-btn>
          </div>
        </v-layout>

        <v-layout column>
          <div class="headline">CRUD Operations</div>
          <div>
            <v-btn color="info" to="/crud-operations/basic">CRUD</v-btn>
            <v-btn color="info" to="/crud-operations/rest">REST</v-btn>
            <v-btn color="info" disabled to="/crud-operations/graphql">GraphQL</v-btn>
          </div>
        </v-layout>

        <v-layout column>
          <div class="headline">Form Controls</div>
          <div>
            <v-btn color="info" to="/form-controls/template-driven">Template-driven</v-btn>
            <v-btn color="info" disabled to="/form-controls/reactive">Reactive</v-btn>
          </div>
        </v-layout>

        <v-layout column>
          <div class="headline">Globalization</div>
          <div>
            <v-btn color="info" to="/i18n">I18n</v-btn>
          </div>
        </v-layout>

        <v-layout column>
          <div class="headline">Playground</div>
          <div>
            <v-btn color="info" to="/counter">Counter</v-btn>
          </div>
        </v-layout>

      </v-layout>
    );
  },
};
</script>

<style scoped>
.header {
  padding: 1rem;
  text-align: center;
}
</style>
