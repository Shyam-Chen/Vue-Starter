<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XCard, XPopover, XCode, XButton } from '@x/ui';

const controlled = ref(false);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Popover' }]" />

  <h1 class="text-4xl font-extrabold my-4">Popover</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XPopover>
        <XButton icon="i-mdi-atom" />

        <template #content>
          <div class="px-4 py-2">The content of the Popover.</div>
        </template>
      </XPopover>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold mb-4 pt-6">Controlled</h2>

    <XCard>
      <div class="flex items-center gap-2">
        Status:
        <XCode>{{ controlled }}</XCode>
        <XButton icon="i-mdi-add" @click="controlled = true" />
        <XButton icon="i-mdi-minus" @click="controlled = false" />
      </div>

      <XPopover v-model="controlled">
        <XButton icon="i-mdi-atom" @click="controlled = !controlled" />

        <template #content>
          <div class="flex gap-2 px-4 py-2">
            Status:
            <XCode>{{ controlled }}</XCode>
          </div>
        </template>
      </XPopover>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <XPopover disabled>
        <XButton icon="i-mdi-atom" disabled />

        <template #content>
          <div class="px-4 py-2">The content of the Popover.</div>
        </template>
      </XPopover>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Placement</h2>

    <XCard>
      <div class="flex justify-between h-50">
        <div>
          <XPopover>
            <XButton icon="i-mdi-atom" />

            <template #content>
              <div class="px-4 py-2">The content of the Popover.</div>
            </template>
          </XPopover>
        </div>

        <div>
          <XPopover>
            <XButton icon="i-mdi-atom" />

            <template #content>
              <div class="px-4 py-2">The content of the Popover.</div>
            </template>
          </XPopover>
        </div>
      </div>

      <div class="flex justify-evenly h-50">
        <div v-for="num in 6" :key="num">
          <XPopover>
            <XButton icon="i-mdi-atom" />

            <template #content>
              <div class="px-4 py-2">The content of the Popover.</div>
            </template>
          </XPopover>
        </div>
      </div>

      <div class="flex justify-between h-50">
        <div>
          <XPopover>
            <XButton icon="i-mdi-atom" />

            <template #content>
              <div class="px-4 py-2">The content of the Popover.</div>
            </template>
          </XPopover>
        </div>

        <div>
          <XPopover>
            <XButton icon="i-mdi-atom" />

            <template #content>
              <div class="px-4 py-2">The content of the Popover.</div>
            </template>
          </XPopover>
        </div>
      </div>
    </XCard>
  </section>
</template>
