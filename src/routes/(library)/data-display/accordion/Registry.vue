<script lang="ts" setup>
import { ref } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Accordion from '~/components/Accordion.vue';
import AccordionGroup from '~/components/AccordionGroup.vue';
import AccordionSection from '~/components/AccordionSection.vue';

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

    <AccordionGroup>
      <AccordionSection>
        <template #header>
          <div>Approachable</div>
        </template>

        <template #content>
          <div>
            Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class
            documentation.
          </div>
        </template>
      </AccordionSection>

      <AccordionSection>
        <template #header>
          <div>Performant</div>
        </template>

        <template #content>
          <div>
            Truly reactive, compiler-optimized rendering system that rarely requires manual
            optimization.
          </div>
        </template>
      </AccordionSection>

      <AccordionSection>
        <template #header>
          <div>Versatile</div>
        </template>

        <template #content>
          <div>
            A rich, incrementally adoptable ecosystem that scales between a library and a
            full-featured framework.
          </div>
        </template>
      </AccordionSection>
    </AccordionGroup>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Model</div>

    <div class="mb-2">{{ accordionGroup }}</div>

    <AccordionGroup v-model="accordionGroup">
      <AccordionSection value="approachable">
        <template #header>
          <div>Approachable</div>
        </template>

        <template #content>
          <div>
            Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class
            documentation.
          </div>
        </template>
      </AccordionSection>

      <AccordionSection value="performant">
        <template #header>
          <div>Performant</div>
        </template>

        <template #content>
          <div>
            Truly reactive, compiler-optimized rendering system that rarely requires manual
            optimization.
          </div>
        </template>
      </AccordionSection>

      <AccordionSection value="versatile">
        <template #header>
          <div>Versatile</div>
        </template>

        <template #content>
          <div>
            A rich, incrementally adoptable ecosystem that scales between a library and a
            full-featured framework.
          </div>
        </template>
      </AccordionSection>
    </AccordionGroup>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Model with multiple</div>

    <div class="mb-2">{{ accordionGroupMultiple }}</div>

    <AccordionGroup v-model="accordionGroupMultiple" multiple>
      <AccordionSection value="approachable">
        <template #header>
          <div>Approachable</div>
        </template>

        <template #content>
          <div>
            Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class
            documentation.
          </div>
        </template>
      </AccordionSection>

      <AccordionSection value="performant">
        <template #header>
          <div>Performant</div>
        </template>

        <template #content>
          <div>
            Truly reactive, compiler-optimized rendering system that rarely requires manual
            optimization.
          </div>
        </template>
      </AccordionSection>

      <AccordionSection value="versatile">
        <template #header>
          <div>Versatile</div>
        </template>

        <template #content>
          <div>
            A rich, incrementally adoptable ecosystem that scales between a library and a
            full-featured framework.
          </div>
        </template>
      </AccordionSection>
    </AccordionGroup>
  </div>
</template>
