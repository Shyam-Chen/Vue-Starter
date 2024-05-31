<script lang="ts" setup>
import { XBreadcrumb, XCard, XCodeBlock, XCode } from '@x/ui';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';
import Multiple from './Multiple.vue';
import MultipleCode from './Multiple.vue?raw';
import Icon from './Icon.vue';
import IconCode from './Icon.vue?raw';
import MinMax from './MinMax.vue';
import MinMaxCode from './MinMax.vue?raw';

const codeImport = `import { XMeterGroup } from '@x/ui';`;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'MeterGroup' }]" />

  <h1 class="text-4xl font-extrabold my-4">MeterGroup</h1>
  <p class="my-4">MeterGroup displays scalar measurements within a known range.</p>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Import</h2>
    <XCodeBlock :code="codeImport" language="ts" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Basic</h2>
    <p class="my-4">
      MeterGroup requires a <XCode>value</XCode> as the data to display where each item in the
      collection should be a type of <XCode>MeterItem</XCode>.
    </p>

    <XCard>
      <Basic />
    </XCard>

    <XCodeBlock :code="BasicCode" language="html" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Multiple</h2>
    <p class="my-4">Adding more items to the array displays the meters in a group.</p>

    <XCard>
      <Multiple />
    </XCard>

    <XCodeBlock :code="MultipleCode" language="html" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Icon</h2>
    <p class="my-4">Icons can be displayed next to the labels instead of the default marker.</p>

    <XCard>
      <Icon />
    </XCard>

    <XCodeBlock :code="IconCode" language="html" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Min & Max</h2>
    <p class="my-4">
      Boundaries are configured with the <XCode>min</XCode> and <XCode>max</XCode> values whose
      defaults are 0 and 100 respectively.
    </p>

    <XCard>
      <MinMax />
    </XCard>

    <XCodeBlock :code="MinMaxCode" language="html" />
  </section>
</template>
