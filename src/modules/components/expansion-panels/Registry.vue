<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import ExpansionPanel from '~/components/ExpansionPanel.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Components', disabled: true },
      { text: 'Expansion Panels', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Expansion Panels</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <ExpansionPanel>
        <template #header>
          <div class="flex justify-between">
            <div>What is a "Composable"?</div>
            <div class="i-ic-baseline-arrow-drop-down w-6 h-6"></div>
          </div>
        </template>

        <template #content>
          <div class="space-y-4">
            <div>
              In the context of Vue applications, a "composable" is a function that leverages Vue's
              Composition API to encapsulate and reuse stateful logic.
            </div>

            <div>
              When building frontend applications, we often need to reuse logic for common tasks.
              For example, we may need to format dates in many places, so we extract a reusable
              function for that. This formatter function encapsulates stateless logic: it takes some
              input and immediately returns expected output. There are many libraries out there for
              reusing stateless logic - for example lodash and date-fns, which you may have heard
              of.
            </div>

            <div>
              By contrast, stateful logic involves managing state that changes over time. A simple
              example would be tracking the current position of the mouse on a page. In real world
              scenarios, it could also be more complex logic such as touch gestures or connection
              status to a database.
            </div>
          </div>
        </template>
      </ExpansionPanel>
    </div>
  </div>
</template>
