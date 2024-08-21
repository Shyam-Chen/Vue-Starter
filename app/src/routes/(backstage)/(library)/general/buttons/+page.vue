<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XButton, XCard, XChip, XPopover, XListbox } from '@x/ui';

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

  <h1 class="text-4xl font-extrabold my-4">Button</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="space-y-4">
        <div class="flex flex-col md:flex-row gap-4">
          <XButton label="Contained" variant="contained" size="small" />
          <XButton label="Outlined" variant="outlined" size="small" />
          <XButton label="Text" variant="text" size="small" />
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <XButton label="Contained" variant="contained" />
          <XButton label="Outlined" variant="outlined" />
          <XButton label="Text" variant="text" />
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <XButton label="Contained" variant="contained" size="large" />
          <XButton label="Outlined" variant="outlined" size="large" />
          <XButton label="Text" variant="text" size="large" />
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Icons</h2>

    <XCard>
      <div class="space-y-4">
        <div class="flex flex-col md:flex-row gap-4">
          <XButton icon="i-material-symbols-add-rounded" size="small" />
          <XButton prepend="i-material-symbols-search-rounded" label="Search" size="small" />
          <XButton label="Next" append="i-material-symbols-arrow-right-alt-rounded" size="small" />
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <XButton icon="i-material-symbols-add-rounded" />
          <XButton prepend="i-material-symbols-search-rounded" label="Search" />
          <XButton label="Next" append="i-material-symbols-arrow-right-alt-rounded" />
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <XButton icon="i-material-symbols-add-rounded" size="large" />
          <XButton prepend="i-material-symbols-search-rounded" label="Search" size="large" />
          <XButton label="Next" append="i-material-symbols-arrow-right-alt-rounded" size="large" />
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <div class="flex flex-col md:flex-row gap-4">
        <XButton label="Contained" variant="contained" disabled />
        <XButton label="Outlined" variant="outlined" disabled />
        <XButton label="Text" variant="text" disabled />
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Loading</h2>

    <XCard>
      <div class="space-y-4">
        <div class="flex gap-4">
          <XButton
            icon="i-material-symbols-search-rounded"
            size="small"
            :loading="searchLoading"
            @click="search"
          />
          <XButton
            icon="i-material-symbols-search-rounded"
            :loading="searchLoading"
            @click="search"
          />
          <XButton
            icon="i-material-symbols-search-rounded"
            size="large"
            :loading="searchLoading"
            @click="search"
          />
        </div>

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
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Colors</h2>

    <XCard>
      <div class="space-y-4">
        <div class="flex flex-col md:flex-row flex-wrap gap-4">
          <XButton label="Primary" color="primary" />
          <XButton label="Secondary" color="secondary" />
          <XButton label="Success" color="success" />
          <XButton label="Danger" color="danger" />
          <XButton label="Warning" color="warning" />
          <XButton label="Info" color="info" />
        </div>

        <div class="flex flex-col md:flex-row flex-wrap gap-4">
          <XButton label="Primary" variant="outlined" color="primary" />
          <XButton label="Secondary" variant="outlined" color="secondary" />
          <XButton label="Success" variant="outlined" color="success" />
          <XButton label="Danger" variant="outlined" color="danger" />
          <XButton label="Warning" variant="outlined" color="warning" />
          <XButton label="Info" variant="outlined" color="info" />
        </div>

        <div class="flex flex-col md:flex-row flex-wrap gap-4">
          <XButton label="Primary" variant="text" color="primary" />
          <XButton label="Secondary" variant="text" color="secondary" />
          <XButton label="Success" variant="text" color="success" />
          <XButton label="Danger" variant="text" color="danger" />
          <XButton label="Warning" variant="text" color="warning" />
          <XButton label="Info" variant="text" color="info" />
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Template</h2>

    <XCard>
      <XButton variant="outlined">
        Template
        <XChip>5</XChip>
      </XButton>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Button Group</h2>

    <XCard>
      <div class="grid grid-rows-2 gap-4">
        <XButton.Group>
          <XButton label="Year" />
          <XButton label="Month" />
          <XButton label="Week" />
          <XButton label="Day" />
        </XButton.Group>

        <XButton.Group>
          <XButton label="Year" variant="outlined" />
          <XButton label="Month" variant="outlined" />
          <XButton label="Week" variant="outlined" />
          <XButton label="Day" variant="outlined" />
        </XButton.Group>
      </div>
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Controlled</h3>

      <XCard>
        <XButton.Group v-model="buttonGroup">
          <XButton label="Year" />
          <XButton label="Month" />
          <XButton label="Week" />
          <XButton label="Day" />
        </XButton.Group>
      </XCard>
    </section>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Split</h3>

      <XCard>
        <div class="flex justify-end">
          <div>
            <XButton.Group>
              <XButton prepend="i-material-symbols-add-rounded" label="New" />

              <XPopover>
                <XButton prepend="i-material-symbols-keyboard-arrow-down-rounded" />

                <template #content>
                  <XListbox>
                    <XListbox.Item>
                      <div class="flex items-center gap-2">
                        <div class="i-material-symbols-refresh-rounded w-5 h-5"></div>
                        <div>Refresh</div>
                      </div>
                    </XListbox.Item>
                    <XListbox.Item>
                      <div class="flex items-center gap-2">
                        <div class="i-material-symbols-edit-rounded w-5 h-5"></div>
                        <div>Edit</div>
                      </div>
                    </XListbox.Item>
                    <XListbox.Item>
                      <div class="flex items-center gap-2">
                        <div class="i-material-symbols-delete-rounded w-5 h-5"></div>
                        <div>Delete</div>
                      </div>
                    </XListbox.Item>
                    <XListbox.Item>
                      <div class="flex items-center gap-2">
                        <div class="i-material-symbols-upload-rounded w-5 h-5"></div>
                        <div>Upload</div>
                      </div>
                    </XListbox.Item>
                  </XListbox>
                </template>
              </XPopover>
            </XButton.Group>
          </div>
        </div>
      </XCard>
    </section>
  </section>
</template>
