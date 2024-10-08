<script lang="ts" setup>
import { ref, reactive, watch, toRef } from 'vue';
import { useLocaler, useLocale } from 'vue-localer';
import { vOnClickOutside } from '@vueuse/components';

import Chip from '../chip/Chip.vue';
import FormControl, { type FormControlProps, formControlDefaults } from '../form-control';

defineOptions({
  inheritAttrs: false,
});

const valueModel = defineModel<string[]>('value', { default: [] });
const statusModel = defineModel<boolean>('status', { default: true });

withDefaults(
  defineProps<
    {
      placeholder?: string;
      disabled?: boolean;
      closable?: boolean;
      append?: string;
      selectedLabels?: boolean;
    } & FormControlProps
  >(),
  {
    placeholder: '',
    disabled: false,
    closable: true,
    append: '',
    selectedLabels: false,
    ...formControlDefaults,
  },
);

const emit = defineEmits<{
  (evt: 'input', val: string): void;
  (evt: 'append'): void;
}>();

const localer = useLocaler();
const locale = useLocale();

const input = ref<HTMLInputElement>();

const flux = reactive({
  text: '',
  backspace: false,
  focused: false,
  onFocus() {
    flux.focused = true;
    input.value?.focus();
  },
  onBlur() {
    flux.focused = false;
    input.value?.blur();
  },
  onClose(idx: number) {
    const chips = [...valueModel.value];
    chips.splice(idx, 1);
    valueModel.value = chips;
  },
  onEnter() {
    if (flux.text) {
      valueModel.value = [...valueModel.value, flux.text];
      flux.text = '';
      flux.backspace = true;
    }
  },
  onDelete() {
    if (!flux.text && flux.backspace) {
      const chips = [...valueModel.value];
      chips.pop();
      valueModel.value = chips;
    }

    if (!flux.text) {
      flux.backspace = true;
    }
  },
});

watch(
  () => flux.text,
  (val, oldVal) => {
    if (!val && !oldVal) flux.backspace = true;
    if (val) flux.backspace = false;
  },
  { immediate: true },
);

defineExpose({
  text: toRef(flux, 'text'),
});
</script>

<template>
  <FormControl :label :required :invalid :help>
    <template #label>
      <slot></slot>
    </template>

    <template #default="{ id }">
      <div
        v-on-click-outside="flux.onBlur"
        class="ChipField"
        :class="[
          selectedLabels && statusModel ? 'py-2' : valueModel?.length ? 'py-1' : 'py-2',
          {
            focused: flux.focused,
            invalid,
            disabled,
            append,
          },
        ]"
        @click="flux.onFocus"
      >
        <template v-if="selectedLabels && statusModel && valueModel.length">
          {{
            valueModel.length === 1
              ? localer.f(locale.oneItemSelected, { num: valueModel.length }) || `1 item selected`
              : localer.f(locale.numItemsSelected, { num: valueModel.length }) ||
                `${valueModel.length} items selected`
          }}
        </template>

        <template v-else>
          <Chip
            v-for="(val, idx) in valueModel"
            :key="val"
            :closable
            :disabled
            @close="flux.onClose(idx)"
          >
            {{ val }}
          </Chip>
        </template>

        <input
          :id
          ref="input"
          v-model="flux.text"
          v-bind="$attrs"
          class="ChipField-Input outline-none w-fit bg-inherit"
          :class="{ 'cursor-not-allowed': disabled }"
          :placeholder
          :disabled
          @input.stop="emit('input', flux.text)"
          @keyup.enter="flux.onEnter"
          @keyup.delete="flux.onDelete"
        />

        <div v-if="append" class="ChipField-Append" @click.stop="emit('append')">
          <div :class="append" class="size-5"></div>
        </div>
      </div>
    </template>
  </FormControl>
</template>

<style lang="scss" scoped>
.ChipField {
  @apply relative flex flex-wrap gap-1 bg-white dark:bg-slate-800 border border-slate-400 rounded w-full px-3 leading-tight;

  &.focused {
    @apply ring-2 ring-primary-500/50 border-primary-400;
  }

  &.invalid {
    @apply border-red-500 dark:border-red-500 ring-red-500/40;
  }

  &.disabled {
    @apply cursor-not-allowed opacity-60;
  }

  &.append {
    @apply pe-8;
  }
}

.ChipField-Input {
  @apply placeholder:text-slate-400 dark:placeholder:text-slate-500;
}

.ChipField-Append {
  @apply absolute end-2 top-1/2 z-1 w-5 h-5 -translate-y-1/2;
}
</style>
