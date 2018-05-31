<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline mb-1">Template Rendering</div>

      <TemplateSyntax />

      <v-layout column class="mt-1 mb-1">
        <div class="title mb-2">Computed Properties and Watchers</div>
        <div>...</div>
      </v-layout>

      <ClassAndStyleBindings />
      <ConditionalRendering />
      <ListRendering />
      <EventHandling />

    </v-layout>
  </v-container>
</template>

<script>
import TemplateSyntax from './TemplateSyntax';
import ClassAndStyleBindings from './ClassAndStyleBindings';
import ConditionalRendering from './ConditionalRendering';
import ListRendering from './ListRendering';
import EventHandling from './EventHandling';

export default {
  components: {
    TemplateSyntax,
    ClassAndStyleBindings,
    ConditionalRendering,
    ListRendering,
    EventHandling,
  },
};
</script>

<style scoped>
.layout {
  border: 1px solid #e91e63;
  padding: 1rem;
}
</style>
