<template>
  <v-container class="shell-container" fluid>
    <v-layout column>
      <div class="headline mb-1">Template Rendering</div>

      <TemplateSyntax />
      <ComputedProperties />
      <Watchers />
      <ClassAndStyleBindings />
      <ConditionalRendering />
      <ListRendering />
      <EventHandling />
      <FormInputBindings />
    </v-layout>
  </v-container>
</template>

<script>
// @flow

import TemplateSyntax from './TemplateSyntax';
import ComputedProperties from './ComputedProperties';
import Watchers from './Watchers';
import ClassAndStyleBindings from './ClassAndStyleBindings';
import ConditionalRendering from './ConditionalRendering';
import ListRendering from './ListRendering';
import EventHandling from './EventHandling';
import FormInputBindings from './FormInputBindings';

export default {
  components: {
    TemplateSyntax,
    ComputedProperties,
    Watchers,
    ClassAndStyleBindings,
    ConditionalRendering,
    ListRendering,
    EventHandling,
    FormInputBindings,
  },
};
</script>

<style scoped>
.layout:not(:first-child) {
  padding: 1rem;
}
</style>
