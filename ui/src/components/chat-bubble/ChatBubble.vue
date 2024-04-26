<script lang="ts" setup>
import type { ComponentExposed } from 'vue-component-type-helpers';
import { nextTick, ref, toRaw } from 'vue';
import { useLocale } from 'vue-localer';

import Avatar from '../avatar/Avatar.vue';
import Button from '../button/Button.vue';
import Popover from '../popover/Popover.vue';
import Listbox from '../listbox';
import ChatBox from '../chat-box/ChatBox.vue';
import Dialog from '../dialog/Dialog.vue';

type Chat = {
  name?: string;
  time?: string;
  self?: boolean;
  chatBox?: BubbleChatBox;
  uploading?: boolean;
  sending?: boolean;
} & Partial<BubbleChatBox>;

type BubbleChatBox = {
  message: string;
  files: (File & { url?: string })[];
};

const defaultModel = defineModel<BubbleChatBox>({
  default: { message: '', files: [] },
});

defineProps<{
  chat?: Chat;
}>();

const emit = defineEmits<{
  (evt: 'uploadFiles', files: File[]): void;
  (evt: 'save', chat?: Chat): void;
  (evt: 'delete', chat?: Chat): void;
}>();

const locale = useLocale();

const morePopover = ref(false);
const edit = ref(false);
const editBox = ref<ComponentExposed<typeof ChatBox>>();
const originalDefaultModel = ref<BubbleChatBox>();
const deleteDialog = ref(false);

async function onEdit() {
  edit.value = true;
  morePopover.value = false;

  if (!originalDefaultModel.value) {
    originalDefaultModel.value = structuredClone(toRaw(defaultModel.value));
  }

  await nextTick();
  if (editBox.value?.editor) editBox.value.editor.commands.focus('end');
}

function onChange(event: Event) {
  const el = event.target as HTMLInputElement;
  const files = Array.from(el.files || []);
  emit('uploadFiles', files);
}

function onCancel() {
  edit.value = false;

  if (originalDefaultModel.value) {
    defaultModel.value = structuredClone(toRaw(originalDefaultModel.value));
  }

  originalDefaultModel.value = undefined;
}

function closeEdit() {
  edit.value = false;
}

function closeDeleteDialog() {
  deleteDialog.value = false;
}

defineExpose({
  closeEdit,
  closeDeleteDialog,
});
</script>

<template>
  <div class="flex items-start gap-2.5 group">
    <Avatar v-if="!chat?.self" class="bg-primary-500 text-white">{{
      chat?.name?.[0].toLocaleUpperCase()
    }}</Avatar>

    <div
      v-if="chat?.self"
      class="self-center hidden group-hover:block"
      :class="{ '!block': morePopover }"
    >
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
            <Listbox.Item @click="onEdit">
              <div class="flex items-center gap-2">
                <div class="i-material-symbols-edit-outline-rounded size-5"></div>
                <div>{{ locale.edit || 'Edit' }}</div>
              </div>
            </Listbox.Item>
            <Listbox.Item @click="deleteDialog = true">
              <div class="flex items-center gap-2">
                <div class="i-material-symbols-delete-outline-rounded size-5"></div>
                <div>{{ locale.delete || 'Delete' }}</div>
              </div>
            </Listbox.Item>
          </Listbox>
        </template>
      </Popover>
    </div>

    <div class="flex flex-col gap-1 md:max-w-xs lg:max-w-sm xl:max-w-sm 2xl:max-w-md">
      <div
        class="flex items-center space-x-2 rtl:space-x-reverse"
        :class="{ 'justify-end': chat?.self }"
      >
        <span v-if="!chat?.self" class="text-sm font-semibold text-gray-900 dark:text-white">{{
          chat?.name
        }}</span>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ chat?.time }}</span>
      </div>

      <div
        v-if="!edit"
        class="flex flex-col leading-1.5 px-4 py-3 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
        :class="{ 'rounded-s-xl !rounded-se-0': chat?.self }"
      >
        <ChatBox v-model="defaultModel" viewonly />
      </div>

      <ChatBox v-if="edit" ref="editBox" v-model="defaultModel" editing />

      <div v-if="edit" class="flex gap-2">
        <div class="flex-1">
          <Button
            icon="i-material-symbols-attach-file-add-rounded"
            variant="text"
            color="secondary"
            size="small"
            :disabled="chat?.sending"
            :loading="chat?.uploading"
            @click="($refs.fileInput as HTMLInputElement).click()"
          />
          <input
            ref="fileInput"
            type="file"
            multiple
            class="hidden"
            @change="onChange"
            @click="($refs.fileInput as HTMLInputElement).value = ''"
          />
        </div>

        <Button
          prepend="i-material-symbols-close-rounded"
          :label="locale.cancel || 'Cancel'"
          color="secondary"
          size="small"
          @click="onCancel"
        />
        <Button
          prepend="i-material-symbols-save-outline-rounded"
          :label="locale.save || 'Save'"
          size="small"
          :disabled="chat?.uploading"
          :loading="chat?.sending"
          @click="emit('save', chat)"
        />
      </div>
    </div>

    <Dialog
      v-model="deleteDialog"
      :title="locale.deleteMessageTitle || 'Delete Message'"
      class="!max-w-lg"
    >
      <div class="mb-4">
        {{ locale.deleteMessageContent || 'Are you sure you want to delete this message?' }}
      </div>

      <div
        class="flex flex-col leading-1.5 px-4 py-3 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700"
      >
        <ChatBox :modelValue="originalDefaultModel || defaultModel" viewonly />
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <Button
          prepend="i-material-symbols-close-rounded"
          :label="locale.cancel || 'Cancel'"
          color="secondary"
          size="small"
          @click="deleteDialog = false"
        />
        <Button
          prepend="i-material-symbols-delete-outline-rounded"
          :label="locale.delete || 'Delete'"
          color="danger"
          size="small"
          :disabled="chat?.uploading"
          :loading="chat?.sending"
          @click="emit('delete', chat)"
        />
      </div>
    </Dialog>
  </div>
</template>
