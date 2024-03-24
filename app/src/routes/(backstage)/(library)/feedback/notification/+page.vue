<script lang="ts" setup>
import { XBreadcrumb, XCard, XCodeBlock } from '@x/ui';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';
import Custom from './Custom.vue';
import CustomCode from './Custom.vue?raw';
import Severity from './Severity.vue';
import SeverityCode from './Severity.vue?raw';

const codeImport1 =
  `<!-- Recommend putting it into \`App.vue\`. -->
<script lang="ts" setup>
import { XNotification } from '@x/ui';
</script` +
  '>' +
  `

<template>
  <XNotification />
</template>`;

const codeImport2 = `import { useNotification } from '@x/ui';`;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Notification' }]" />

  <h1 class="text-4xl font-extrabold my-4">Notification</h1>
  <p class="my-4">Notification is used to display messages in an overlay.</p>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Import</h2>

    <XCodeBlock :code="codeImport1" language="vue" />
    <XCodeBlock :code="codeImport2" language="ts" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Basic</h2>

    <XCard>
      <Basic />
    </XCard>

    <XCodeBlock :code="BasicCode" language="vue" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Custom</h2>

    <XCard>
      <Custom />
    </XCard>

    <XCodeBlock :code="CustomCode" language="vue" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Severity</h2>

    <XCard>
      <Severity />
    </XCard>

    <XCodeBlock :code="SeverityCode" language="vue" />
  </section>
</template>
