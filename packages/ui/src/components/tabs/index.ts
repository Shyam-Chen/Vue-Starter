import Tab from './Tab.vue';
import Tabs from './Tabs.vue';

Tabs.Tab = Tab;

export default Tabs as typeof Tabs & {
  Tab: typeof Tab;
};
