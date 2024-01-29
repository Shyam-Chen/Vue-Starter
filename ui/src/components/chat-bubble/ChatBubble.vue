<script lang="ts" setup>
import Avatar from '../avatar/Avatar.vue';
import Button from '../button/Button.vue';
import Popover from '../popover/Popover.vue';
import Listbox from '../listbox/Listbox.vue';

defineProps<{
  self?: boolean;
}>();
</script>

<template>
  <div class="flex items-start gap-2.5 group">
    <Avatar v-if="!self" class="bg-primary-500 text-white">BG</Avatar>

    <div v-if="self" class="self-center hidden group-hover:block">
      <Popover>
        <Button icon="i-material-symbols-more-vert" variant="text" color="secondary" size="small" />

        <template #content>
          <Listbox>
            <Listbox.Item>
              <div class="flex items-center gap-2">
                <div class="i-material-symbols-edit-rounded w-5 h-5"></div>
                <div>Edit</div>
              </div>
            </Listbox.Item>
            <Listbox.Item>
              <div class="flex items-center gap-2">
                <div class="i-material-symbols-delete-rounded w-5 h-5"></div>
                <div>Delete</div>
              </div>
            </Listbox.Item>
          </Listbox>
        </template>
      </Popover>
    </div>

    <div class="flex flex-col gap-1 w-full max-w-xs">
      <div class="flex items-center space-x-2 rtl:space-x-reverse" :class="{ 'justify-end': self }">
        <span v-if="!self" class="text-sm font-semibold text-gray-900 dark:text-white"
          >Bonnie Green</span
        >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
      </div>
      <div
        class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
        :class="{ 'rounded-s-xl !rounded-se-0': self }"
      >
        <p class="text-sm font-normal text-gray-900 dark:text-white">
          That's awesome. I think our users will really appreciate the improvements.
        </p>
      </div>
    </div>

    <div v-if="!self" class="self-center hidden group-hover:block">
      <Popover>
        <Button icon="i-material-symbols-more-vert" variant="text" color="secondary" size="small" />

        <template #content>
          <Listbox>
            <Listbox.Item>
              <div class="flex items-center gap-2">
                <div class="i-material-symbols-edit-rounded w-5 h-5"></div>
                <div>Edit</div>
              </div>
            </Listbox.Item>
            <Listbox.Item>
              <div class="flex items-center gap-2">
                <div class="i-material-symbols-delete-rounded w-5 h-5"></div>
                <div>Delete</div>
              </div>
            </Listbox.Item>
          </Listbox>
        </template>
      </Popover>
    </div>
  </div>
</template>
