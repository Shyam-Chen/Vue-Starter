<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline mb-1">Template Rendering</div>

      <TemplateSyntax />
      <ComputedProperties />
      <Watchers />
      <ClassAndStyleBindings />
      <ConditionalRendering />
      <ListRendering />
      <EventHandling />
    </v-layout>
  </v-container>
</template>

<script>
import TemplateSyntax from './TemplateSyntax';
import ComputedProperties from './ComputedProperties';
import Watchers from './Watchers';
import ClassAndStyleBindings from './ClassAndStyleBindings';
import ConditionalRendering from './ConditionalRendering';
import ListRendering from './ListRendering';
import EventHandling from './EventHandling';

export default {
  components: {
    TemplateSyntax,
    ComputedProperties,
    Watchers,
    ClassAndStyleBindings,
    ConditionalRendering,
    ListRendering,
    EventHandling,
  },
};
</script>

<style scoped>
.layout:not(:first-child) {
  padding: 1rem;
}
</style>
