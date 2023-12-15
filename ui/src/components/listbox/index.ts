import Listbox from './Listbox.vue';
import ListboxItem from './ListboxItem.vue';

Listbox.Item = ListboxItem;

export default Listbox as typeof Listbox & {
  Item: typeof ListboxItem;
};
