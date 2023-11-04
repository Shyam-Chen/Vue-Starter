import Tabs from './Tabs.vue';
import Tab from './Tab.vue';

Tabs.Tab = Tab;

export default Tabs as typeof Tabs & {
  Tab: typeof Tab;
};
