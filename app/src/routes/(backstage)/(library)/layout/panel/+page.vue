<script lang="ts" setup>
import { XBreadcrumb, XPanel } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Layout' }, { text: 'Panel' }]" />

  <h1 class="text-4xl font-extrabold my-4">Panel</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XPanel title="What is Vue?">
      <div>
        Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces.
        It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and
        component-based programming model that helps you efficiently develop user interfaces, be
        they simple or complex.
      </div>
    </XPanel>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Status</h2>

    <XPanel :status="false">
      <template #header>
        <div>What is Vue?</div>
      </template>

      <template #content>
        <div>
          Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces.
          It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and
          component-based programming model that helps you efficiently develop user interfaces, be
          they simple or complex.
        </div>
      </template>
    </XPanel>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Template</h2>

    <XPanel>
      <template #header>
        <div class="flex">
          <div class="i-simple-icons-vuedotjs size-7 me-2"></div>
          What is Vue?
        </div>
      </template>

      <template #content>
        <div>
          Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces.
          It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and
          component-based programming model that helps you efficiently develop user interfaces, be
          they simple or complex.
        </div>
      </template>
    </XPanel>
  </section>
</template>
