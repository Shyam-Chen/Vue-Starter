<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XPanel, XAccordion } from '@x/ui';

const accordionGroup = ref<string[]>([]);
const accordionGroupMultiple = ref<string[]>([]);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Accordion' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Accordion</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex flex-col space-y-2">
      <XPanel>
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
      </XPanel>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Group</div>

    <XAccordion>
      <XAccordion.Item>
        <template #header>
          <div>Approachable</div>
        </template>

        <template #content>
          <div>
            Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class
            documentation.
          </div>
        </template>
      </XAccordion.Item>

      <XAccordion.Item>
        <template #header>
          <div>Performant</div>
        </template>

        <template #content>
          <div>
            Truly reactive, compiler-optimized rendering system that rarely requires manual
            optimization.
          </div>
        </template>
      </XAccordion.Item>

      <XAccordion.Item>
        <template #header>
          <div>Versatile</div>
        </template>

        <template #content>
          <div>
            A rich, incrementally adoptable ecosystem that scales between a library and a
            full-featured framework.
          </div>
        </template>
      </XAccordion.Item>
    </XAccordion>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Model</div>

    <div class="mb-2">{{ accordionGroup }}</div>

    <XAccordion v-model="accordionGroup">
      <XAccordion.Item value="approachable">
        <template #header>
          <div>Approachable</div>
        </template>

        <template #content>
          <div>
            Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class
            documentation.
          </div>
        </template>
      </XAccordion.Item>

      <XAccordion.Item value="performant">
        <template #header>
          <div>Performant</div>
        </template>

        <template #content>
          <div>
            Truly reactive, compiler-optimized rendering system that rarely requires manual
            optimization.
          </div>
        </template>
      </XAccordion.Item>

      <XAccordion.Item value="versatile">
        <template #header>
          <div>Versatile</div>
        </template>

        <template #content>
          <div>
            A rich, incrementally adoptable ecosystem that scales between a library and a
            full-featured framework.
          </div>
        </template>
      </XAccordion.Item>
    </XAccordion>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Model with multiple</div>

    <div class="mb-2">{{ accordionGroupMultiple }}</div>

    <XAccordion v-model="accordionGroupMultiple" multiple>
      <XAccordion.Item value="approachable">
        <template #header>
          <div>Approachable</div>
        </template>

        <template #content>
          <div>
            Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class
            documentation.
          </div>
        </template>
      </XAccordion.Item>

      <XAccordion.Item value="performant">
        <template #header>
          <div>Performant</div>
        </template>

        <template #content>
          <div>
            Truly reactive, compiler-optimized rendering system that rarely requires manual
            optimization.
          </div>
        </template>
      </XAccordion.Item>

      <XAccordion.Item value="versatile">
        <template #header>
          <div>Versatile</div>
        </template>

        <template #content>
          <div>
            A rich, incrementally adoptable ecosystem that scales between a library and a
            full-featured framework.
          </div>
        </template>
      </XAccordion.Item>
    </XAccordion>
  </div>
</template>
