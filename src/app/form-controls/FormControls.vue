<script>
import { TemplateDriven } from './template-driven';
import { Reactive } from './reactive';

export default {
  components: {
    TemplateDriven,
    Reactive,
  },
  render() {
    return (<router-view></router-view>);
  },
};
</script>

<style scoped>
</style>
