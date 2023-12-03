<script lang="ts" setup>
import type { ButtonHTMLAttributes, Ref, WritableComputedRef } from 'vue';
import { ref, computed, inject, onMounted } from 'vue';

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'large';
  icon?: string;
  disabled?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (evt: 'click', val: Event): void;
}>();

const buttonGroup = inject('ButtonGroup', {
  model: undefined,
  group: undefined,
}) as {
  model?: WritableComputedRef<number | number[]>;
  group?: Ref<HTMLDivElement>;
};

const idx = ref(-1);
const self = ref<HTMLButtonElement>();

onMounted(() => {
  if (buttonGroup.group?.value && self.value) {
    idx.value = Array.from(buttonGroup.group.value.children).indexOf(self.value);
  }
});

const hasGroup = computed(() => typeof buttonGroup.model?.value === 'number');

function onClick(evt: Event) {
  emit('click', evt);

  if (hasGroup.value) {
    if (typeof buttonGroup.model?.value === 'number') {
      buttonGroup.model.value = idx.value;
    }
  }
}
</script>

<template>
  <button
    ref="self"
    v-bind="$attrs"
    type="button"
    class="Button"
    :class="{
      contained: hasGroup ? idx === buttonGroup.model?.value : variant === 'contained' || !variant,
      outlined: hasGroup ? idx !== buttonGroup.model?.value : variant === 'outlined',
      text: variant === 'text',
      primary: color === 'primary' || !color,
      secondary: color === 'secondary',
      success: color === 'success',
      danger: color === 'danger',
      warning: color === 'warning',
      info: color === 'info',
      small: size === 'small',
      large: size === 'large',
      icon,
      disabled,
    }"
    :disabled="disabled"
    @click="onClick"
  >
    <div v-if="icon" class="w-4 h-4" :class="icon"></div>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.Button {
  @apply flex justify-center items-center gap-2 px-6 py-2 border rounded uppercase text-sm font-medium;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/40;

  &.contained {
    @apply text-white hover:text-gray-100 active:text-gray-200 shadow-md hover:shadow-lg;

    &.primary {
      @apply bg-primary-500 hover:bg-primary-600 active:bg-primary-700 border-primary-500;
    }

    &.secondary {
      @apply bg-gray-500 hover:bg-gray-600 active:bg-gray-700 border-gray-500;
    }

    &.success {
      @apply bg-green-500 hover:bg-green-600 active:bg-green-700 border-green-500;
    }

    &.danger {
      @apply bg-red-500 hover:bg-red-600 active:bg-red-700 border-red-500;
    }

    &.warning {
      @apply bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 border-yellow-500;
    }

    &.info {
      @apply bg-sky-500 hover:bg-sky-600 active:bg-sky-700 border-sky-500;
    }
  }

  &.outlined {
    @apply border-current bg-transparent;
  }

  &.text {
    @apply border-transparent bg-transparent;
  }

  &.outlined,
  &.text {
    &.primary {
      @apply text-primary-500 hover:text-primary-600 active:text-primary-700;
      @apply hover:bg-primary-400/25 active:bg-primary-500/25;
    }

    &.secondary {
      @apply text-gray-500 hover:text-gray-600 active:text-gray-700;
      @apply hover:bg-gray-400/25 active:bg-gray-500/25;
    }

    &.success {
      @apply text-green-500 hover:text-green-600 active:text-green-700;
      @apply hover:bg-green-400/25 active:bg-green-500/25;
    }

    &.danger {
      @apply text-red-500 hover:text-red-600 active:text-red-700;
      @apply hover:bg-red-400/25 active:bg-red-500/25;
    }

    &.warning {
      @apply text-yellow-500 hover:text-yellow-600 active:text-yellow-700;
      @apply hover:bg-yellow-400/25 active:bg-yellow-500/25;
    }

    &.info {
      @apply text-sky-500 hover:text-sky-600 active:text-sky-700;
      @apply hover:bg-sky-400/25 active:bg-sky-500/25;
    }
  }

  &.small {
    @apply px-4 text-xs;
  }

  &.large {
    @apply px-7 text-base;
  }

  &.icon {
    @apply p-0 rounded-full w-38px h-38px;
  }

  &.disabled {
    @apply opacity-60 cursor-not-allowed;
  }
}
</style>
