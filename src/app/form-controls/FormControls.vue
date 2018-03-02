<script>
import { TemplateDriven } from './template-driven';
import { Reactive } from './reactive';

export default {
  components: {
    TemplateDriven,
    Reactive,
  },
  data() {
    return {
      location: window.location.pathname,
    };
  },
  render() {
    return (
      <div>
        {
          this.location === '/form-controls' &&
          <div>
            <v-btn color="info" to="/form-controls/template-driven">Template-driven</v-btn>
            <v-btn color="info" disabled to="/form-controls/reactive">Reactive</v-btn>
          </div>
        }

        <router-view></router-view>
      </div>
    );
  },
};
</script>

<style scoped>
</style>
