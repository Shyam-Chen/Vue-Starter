<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XButton, XChip } from '@x/ui';

const searchLoading = ref(false);

function search() {
  searchLoading.value = true;

  setTimeout(() => {
    searchLoading.value = false;
  }, 3000);
}

const buttonGroup = ref(0);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Button' }]" />

  <div class="my-4">
    <div class="text-4xl font-extrabold">Button</div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4">Basic</div>

    <div class="flex flex-col md:flex-row gap-4 my-4">
      <XButton label="Contained" variant="contained" size="small" />
      <XButton label="Outlined" variant="outlined" size="small" />
      <XButton label="Text" variant="text" size="small" />
    </div>

    <div class="flex flex-col md:flex-row gap-4 my-4">
      <XButton label="Contained" variant="contained" />
      <XButton label="Outlined" variant="outlined" />
      <XButton label="Text" variant="text" />
    </div>

    <div class="flex flex-col md:flex-row gap-4 my-4">
      <XButton label="Contained" variant="contained" size="large" />
      <XButton label="Outlined" variant="outlined" size="large" />
      <XButton label="Text" variant="text" size="large" />
    </div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Icons</div>

    <div class="flex flex-col md:flex-row gap-4 my-4">
      <XButton icon="i-material-symbols-add-rounded" size="small" />
      <XButton prepend="i-material-symbols-search-rounded" label="Search" size="small" />
      <XButton label="Next" append="i-material-symbols-arrow-right-alt-rounded" size="small" />
    </div>

    <div class="flex flex-col md:flex-row gap-4 my-4">
      <XButton icon="i-material-symbols-add-rounded" />
      <XButton prepend="i-material-symbols-search-rounded" label="Search" />
      <XButton label="Next" append="i-material-symbols-arrow-right-alt-rounded" />
    </div>

    <div class="flex flex-col md:flex-row gap-4 my-4">
      <XButton icon="i-material-symbols-add-rounded" size="large" />
      <XButton prepend="i-material-symbols-search-rounded" label="Search" size="large" />
      <XButton label="Next" append="i-material-symbols-arrow-right-alt-rounded" size="large" />
    </div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Disabled</div>

    <div class="flex flex-col md:flex-row gap-4 my-4">
      <XButton label="Contained" variant="contained" disabled />
      <XButton label="Outlined" variant="outlined" disabled />
      <XButton label="Text" variant="text" disabled />
    </div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Loading</div>

    <div class="space-y-4">
      <XButton
        prepend="i-material-symbols-search-rounded"
        label="Search"
        size="small"
        :loading="searchLoading"
        @click="search"
      />
      <XButton
        prepend="i-material-symbols-search-rounded"
        label="Search"
        :loading="searchLoading"
        @click="search"
      />
      <XButton
        prepend="i-material-symbols-search-rounded"
        label="Search"
        size="large"
        :loading="searchLoading"
        @click="search"
      />
    </div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Colors</div>

    <div class="flex flex-col md:flex-row flex-wrap gap-4 my-4">
      <XButton label="Primary" color="primary" />
      <XButton label="Secondary" color="secondary" />
      <XButton label="Success" color="success" />
      <XButton label="Danger" color="danger" />
      <XButton label="Warning" color="warning" />
      <XButton label="Info" color="info" />
    </div>

    <div class="flex flex-col md:flex-row flex-wrap gap-4 my-4">
      <XButton label="Primary" variant="outlined" color="primary" />
      <XButton label="Secondary" variant="outlined" color="secondary" />
      <XButton label="Success" variant="outlined" color="success" />
      <XButton label="Danger" variant="outlined" color="danger" />
      <XButton label="Warning" variant="outlined" color="warning" />
      <XButton label="Info" variant="outlined" color="info" />
    </div>

    <div class="flex flex-col md:flex-row flex-wrap gap-4 my-4">
      <XButton label="Primary" variant="text" color="primary" />
      <XButton label="Secondary" variant="text" color="secondary" />
      <XButton label="Success" variant="text" color="success" />
      <XButton label="Danger" variant="text" color="danger" />
      <XButton label="Warning" variant="text" color="warning" />
      <XButton label="Info" variant="text" color="info" />
    </div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Template</div>

    <XButton variant="outlined">
      Template
      <XChip>5</XChip>
    </XButton>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Button Group</div>

    <XButton.Group>
      <XButton label="Year" variant="outlined" />
      <XButton label="Month" variant="outlined" />
      <XButton label="Week" variant="outlined" />
      <XButton label="Day" variant="outlined" />
    </XButton.Group>

    <div class="my-4">
      <div class="text-2xl font-semibold my-4 pt-2">Controlled</div>

      <XButton.Group v-model="buttonGroup">
        <XButton label="Year" />
        <XButton label="Month" />
        <XButton label="Week" />
        <XButton label="Day" />
      </XButton.Group>
    </div>
  </div>
</template>
