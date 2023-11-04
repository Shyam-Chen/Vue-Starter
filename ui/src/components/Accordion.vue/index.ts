import Accordion from './Accordion.vue';
import AccordionGroup from './AccordionGroup.vue';
import AccordionSection from './AccordionSection.vue';

Accordion.Group = AccordionGroup;
Accordion.Section = AccordionSection;

export default Accordion as typeof Accordion & {
  Group: typeof AccordionGroup;
  Section: typeof AccordionSection;
};
