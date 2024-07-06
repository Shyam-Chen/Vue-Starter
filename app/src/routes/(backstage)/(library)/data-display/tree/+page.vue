<script lang="ts" setup>
import { XBreadcrumb, XCard, XCodeBlock, XTabs } from '@x/ui';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';
import Controlled from './Controlled.vue';
import ControlledCode from './Controlled.vue?raw';
import MultipleSelection from './MultipleSelection.vue';
import MultipleSelectionCode from './MultipleSelection.vue?raw';
import Lazy from './Lazy.vue';
import nodesDataCode from './nodesData?raw';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tree' }]" />

  <h1 class="text-4xl font-extrabold my-4">Tree</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <Basic />
    </XCard>

    <XTabs>
      <XTabs.Tab title="Vue">
        <XCodeBlock :code="BasicCode" language="vue" class="max-h-100" />
      </XTabs.Tab>

      <XTabs.Tab title="Nodes">
        <XCodeBlock :code="nodesDataCode" language="ts" class="max-h-100" />
      </XTabs.Tab>
    </XTabs>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Controlled</h2>

    <XCard>
      <Controlled />
    </XCard>

    <XCodeBlock :code="ControlledCode" language="vue" class="max-h-100" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Multiple Selection</h2>

    <XCard>
      <MultipleSelection />
    </XCard>

    <XCodeBlock :code="MultipleSelectionCode" language="vue" class="max-h-100" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Lazy (WIP)</h2>

    <XCard>
      <Lazy />
    </XCard>
  </section>
</template>
