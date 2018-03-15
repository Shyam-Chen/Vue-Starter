<script>
export default {
  render() {
    return (
      <v-layout column>
        <v-layout column>
          <div class="headline">CRUD Operations</div>
          <div>
            <v-btn color="info" to="/basic">CRUD</v-btn>
            <v-btn color="info" to="/rest">REST</v-btn>
            <v-btn color="info" disabled to="/graphql">GraphQL</v-btn>
          </div>
        </v-layout>

        <v-layout column>
          <div class="headline">Form Controls</div>
          <div>
            <v-btn color="info" to="/form-controls">Form Controls</v-btn>
            {' - '}
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
</style>
