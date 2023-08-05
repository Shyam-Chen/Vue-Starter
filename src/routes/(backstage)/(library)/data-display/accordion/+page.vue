<script lang="ts" setup>
import { ref } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Accordion from '~/components/Accordion.vue';

const accordionGroup = ref<string[]>([]);
const accordionGroupMultiple = ref<string[]>([]);
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Display', disabled: true },
      { text: 'Accordion', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Accordion</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex flex-col space-y-2">
      <Accordion>
        <template #header>
          <div>What is Vue?</div>
        </template>

        <template #content>
          <div>
            Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user
            interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a
            declarative and component-based programming model that helps you efficiently develop
            user interfaces, be they simple or complex.
          </div>
        </template>
      </Accordion>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Group</div>

    <Accordion.Group>
      <Accordion.Section>
        <template #header>
          <div>Approachable</div>
        </template>

        <template #content>
          <div>
            Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class
            documentation.
          </div>
        </template>
      </Accordion.Section>

      <Accordion.Section>
        <template #header>
          <div>Performant</div>
        </template>

        <template #content>
          <div>
            Truly reactive, compiler-optimized rendering system that rarely requires manual
            optimization.
          </div>
        </template>
      </Accordion.Section>

      <Accordion.Section>
        <template #header>
          <div>Versatile</div>
        </template>

        <template #content>
          <div>
            A rich, incrementally adoptable ecosystem that scales between a library and a
            full-featured framework.
          </div>
        </template>
      </Accordion.Section>
    </Accordion.Group>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Model</div>

    <div class="mb-2">{{ accordionGroup }}</div>

    <Accordion.Group v-model="accordionGroup">
      <Accordion.Section value="approachable">
        <template #header>
          <div>Approachable</div>
        </template>

        <template #content>
          <div>
            Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class
            documentation.
          </div>
        </template>
      </Accordion.Section>

      <Accordion.Section value="performant">
        <template #header>
          <div>Performant</div>
        </template>

        <template #content>
          <div>
            Truly reactive, compiler-optimized rendering system that rarely requires manual
            optimization.
          </div>
        </template>
      </Accordion.Section>

      <Accordion.Section value="versatile">
        <template #header>
          <div>Versatile</div>
        </template>

        <template #content>
          <div>
            A rich, incrementally adoptable ecosystem that scales between a library and a
            full-featured framework.
          </div>
        </template>
      </Accordion.Section>
    </Accordion.Group>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Model with multiple</div>

    <div class="mb-2">{{ accordionGroupMultiple }}</div>

    <Accordion.Group v-model="accordionGroupMultiple" multiple>
      <Accordion.Section value="approachable">
        <template #header>
          <div>Approachable</div>
        </template>

        <template #content>
          <div>
            Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class
            documentation.
          </div>
        </template>
      </Accordion.Section>

      <Accordion.Section value="performant">
        <template #header>
          <div>Performant</div>
        </template>

        <template #content>
          <div>
            Truly reactive, compiler-optimized rendering system that rarely requires manual
            optimization.
          </div>
        </template>
      </Accordion.Section>

      <Accordion.Section value="versatile">
        <template #header>
          <div>Versatile</div>
        </template>

        <template #content>
          <div>
            A rich, incrementally adoptable ecosystem that scales between a library and a
            full-featured framework.
          </div>
        </template>
      </Accordion.Section>
    </Accordion.Group>
  </div>
</template>
