import Accordion from './Accordion.vue';
import AccordionItem from './AccordionItem.vue';

Accordion.Item = AccordionItem;

export default Accordion as typeof Accordion & {
  Item: typeof AccordionItem;
};
