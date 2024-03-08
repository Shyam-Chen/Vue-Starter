<script lang="ts" setup>
import { ref, reactive } from 'vue';

import Avatar from '../avatar/Avatar.vue';
import Button from '../button/Button.vue';
import Popover from '../popover/Popover.vue';
import Listbox from '../listbox/Listbox.vue';
import ChatBox from '../chat-box/ChatBox.vue';

defineProps<{
  chat?: any;
  self?: boolean;
}>();

const morePopover = ref(false);

const onMouseLeave = () => {
  morePopover.value = false;
};

const edit = ref(false);
const message = ref('');

const flux = reactive({
  files: [] as File[],
  onChange(event: Event) {
    const el = event.target as HTMLInputElement;
    const files = Array.from(el.files || []);
    flux.files = [...flux.files, ...files];
  },
  onDelete(index: number) {
    const arr = [...flux.files];
    arr.splice(index, 1);
    flux.files = arr;
  },
});
</script>

<template>
  <div class="flex items-start gap-2.5 group" @mouseleave="onMouseLeave">
    <Avatar v-if="!self" class="bg-primary-500 text-white">BG</Avatar>

    <div v-if="self" class="self-center hidden group-hover:block">
      <Popover v-model="morePopover">
        <Button
          icon="i-material-symbols-more-vert"
          variant="text"
          color="secondary"
          size="small"
          @click="morePopover = true"
        />

        <template #content>
          <Listbox>
            <Listbox.Item
              @click="
                edit = true;
                morePopover = false;
                message = chat?.message;
              "
            >
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

    <div class="flex flex-col gap-1 md:max-w-xs lg:max-w-sm xl:max-w-sm 2xl:max-w-md">
      <div class="flex items-center space-x-2 rtl:space-x-reverse" :class="{ 'justify-end': self }">
        <span v-if="!self" class="text-sm font-semibold text-gray-900 dark:text-white"
          >Bonnie Green</span
        >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ chat?.time }}</span>
      </div>

      <div
        v-if="!edit"
        class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
        :class="{ 'rounded-s-xl !rounded-se-0': self }"
      >
        <p class="text-sm font-normal text-gray-900 dark:text-white" v-html="chat?.message"></p>
      </div>

      <ChatBox v-if="edit" v-model="message" editing />

      <div>
        <div v-for="(file, index) in flux.files" :key="index" class="flex items-center gap-2">
          {{ file.name }}
          <div
            class="i-material-symbols-delete-rounded size-5 cursor-pointer"
            @click="flux.onDelete(index)"
          ></div>
        </div>
      </div>

      <div v-if="edit" class="flex gap-2">
        <div class="flex-1">
          <Button
            icon="i-material-symbols-attach-file-add-rounded"
            variant="text"
            color="secondary"
            size="small"
            @click="($refs.fileInput as HTMLInputElement).click()"
          />
          <input
            ref="fileInput"
            type="file"
            multiple
            class="hidden"
            @change="flux.onChange"
            @click="($refs.fileInput as HTMLInputElement).value = ''"
          />
        </div>

        <Button color="secondary" size="small" @click="edit = false">Cancel</Button>
        <Button size="small">Save</Button>
      </div>
    </div>
  </div>
</template>
